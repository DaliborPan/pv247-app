import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { promisify } from 'node:util';

import { createClient } from '@libsql/client';
import { createAppAuth } from '@octokit/auth-app';

const run = promisify(execFile);

function options() {
  const args = process.argv.slice(process.argv[2] === '--' ? 3 : 2);
  if (!/^[1-9]$/.test(args[0] ?? '') || args.length > 2) {
    throw new Error('Použití: pnpm clone:homeworks <1-9> [cílová složka]');
  }
  const number = Number(args[0]);
  return {
    number,
    outputDirectory: resolve(args[1] ?? `homework-repos/lecture-${number}`)
  };
}

function studentFolderName(name) {
  const safeCharacters = Array.from(name.normalize('NFC'), character =>
    character.codePointAt(0) < 32 ? '-' : character
  ).join('');
  const folder = safeCharacters
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  if (!folder || folder === '.' || folder === '..') {
    throw new Error('Jméno studenta nelze použít jako název složky.');
  }
  return folder;
}

function text(value, column) {
  if (typeof value !== 'string')
    throw new Error(`Neplatná hodnota ${column} v databázi.`);
  return value;
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Chybí ${name} v .env.`);
  return value;
}

async function git(args, env = process.env) {
  return run('git', args, { env, maxBuffer: 10 * 1024 * 1024 });
}

function repositoryUrl(row) {
  const url = new URL(row.repositoryUrl);
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'github.com' ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash ||
    !/^\/FI-PV247\/[A-Za-z0-9_.-]+\/?$/i.test(url.pathname) ||
    basename(url.pathname.replace(/\/$/, '')) !== row.repositoryName
  ) {
    throw new Error(`Neplatná URL repozitáře: ${row.repositoryUrl}`);
  }
  return url.href;
}

function markdownCell(value) {
  return value.replace(/\s+/g, ' ').replace(/\|/g, '\\|').replace(/</g, '&lt;');
}

async function main() {
  const { number, outputDirectory } = options();
  const lectorGithub = requiredEnv('HOMEWORK_REVIEW_LECTOR_GITHUB');
  const db = createClient({
    url: requiredEnv('DATABASE_URL'),
    authToken: process.env.AUTH_TOKEN
  });

  try {
    const { rows: lectors } = await db.execute({
      sql: "SELECT id FROM user WHERE role = 'lector' AND lower(github) = lower(?)",
      args: [lectorGithub]
    });
    if (lectors.length !== 1) {
      throw new Error(
        `Očekáván právě jeden lektor ${lectorGithub}, nalezeno: ${lectors.length}.`
      );
    }

    const { rows: lectures } = await db.execute({
      sql: 'SELECT id, homeworkSlug FROM lecture ORDER BY availableFrom ASC, id ASC LIMIT 1 OFFSET ?',
      args: [number - 1]
    });
    if (lectures.length !== 1 || !lectures[0].homeworkSlug) {
      throw new Error(`Lekce číslo ${number} s domácím úkolem neexistuje.`);
    }

    const { rows } = await db.execute({
      sql: `SELECT s.name AS studentName,
                   h.status, h.repositoryUrl, h.repositoryName
            FROM user AS s
            LEFT JOIN studentHomework AS h ON h.studentId = s.id AND h.lectureId = ?
            WHERE s.role = 'student' AND s.lectorId = ?
            ORDER BY s.name, s.id`,
      args: [lectures[0].id, lectors[0].id]
    });
    const students = rows.map(row => ({
      studentName: text(row.studentName, 'studentName'),
      status: row.status === null ? null : text(row.status, 'status'),
      repositoryUrl:
        row.repositoryUrl === null
          ? null
          : text(row.repositoryUrl, 'repositoryUrl'),
      repositoryName:
        row.repositoryName === null
          ? null
          : text(row.repositoryName, 'repositoryName')
    }));

    const folderNames = new Map();
    for (const row of students) {
      if (row.status !== 'ready' || !row.repositoryUrl) continue;
      try {
        const folder = studentFolderName(row.studentName);
        const key = folder.toLocaleLowerCase();
        folderNames.set(key, (folderNames.get(key) ?? 0) + 1);
      } catch {
        // Neplatné jméno se vyhodnotí jako chyba daného studenta níže.
      }
    }

    const results = [];
    function recordResult(row, status) {
      const name = row.studentName.replace(/\s+/g, ' ').trim();
      console.log(`${name}: ${status}`);
      results.push({ name, status });
    }
    await mkdir(outputDirectory, { recursive: true });
    const hasRepositories = students.some(
      row => row.status === 'ready' && row.repositoryUrl
    );
    const auth = hasRepositories
      ? createAppAuth({
          appId: requiredEnv('GITHUB_APP_ID'),
          privateKey: requiredEnv('GITHUB_APP_PRIVATE_KEY').replace(
            /\\n/g,
            '\n'
          ),
          installationId: Number(requiredEnv('GITHUB_APP_INSTALLATION_ID'))
        })
      : null;
    const askpassDirectory = hasRepositories
      ? await mkdtemp(join(tmpdir(), 'pv247-git-'))
      : null;
    const askpassPath = askpassDirectory
      ? join(askpassDirectory, 'askpass.sh')
      : null;

    let failed = 0;
    try {
      if (askpassPath) {
        await writeFile(
          askpassPath,
          '#!/bin/sh\ncase "$1" in\n  *Username*) printf "%s\\n" "x-access-token" ;;\n  *Password*) printf "%s\\n" "$PV247_GITHUB_TOKEN" ;;\nesac\n',
          { mode: 0o700 }
        );
      }
      for (const row of students) {
        if (row.status !== 'ready' || !row.repositoryUrl) {
          recordResult(row, 'Neodevzdáno');
          continue;
        }
        let directory;
        let createdDirectory = false;
        let cloneCompleted = false;
        try {
          const url = repositoryUrl(row);
          const folder = studentFolderName(row.studentName);
          if (folderNames.get(folder.toLocaleLowerCase()) !== 1) {
            throw new Error('Stejné jméno má více studentů.');
          }
          directory = join(outputDirectory, folder);
          // Nezasahovat do předchozích klonů ani do jiných souborů uživatele.
          try {
            await mkdir(directory);
            createdDirectory = true;
          } catch (err) {
            if (err.code === 'EEXIST') {
              recordResult(row, 'Přeskočeno');
              continue;
            }
            throw err;
          }

          const installation = await auth({ type: 'installation' });
          const gitEnv = {
            ...process.env,
            GIT_ASKPASS: askpassPath,
            GIT_TERMINAL_PROMPT: '0',
            PV247_GITHUB_TOKEN: installation.token,
            GIT_CONFIG_COUNT: '1',
            GIT_CONFIG_KEY_0: 'credential.helper',
            GIT_CONFIG_VALUE_0: ''
          };
          await git(['clone', '--', url, directory], gitEnv);
          cloneCompleted = true;

          const { stdout } = await git([
            '-C',
            directory,
            'for-each-ref',
            '--format=%(refname:short) %(committerdate:unix)',
            'refs/remotes/origin'
          ]);
          const branches = stdout
            .trim()
            .split('\n')
            .filter(Boolean)
            .map(line => {
              const separator = line.lastIndexOf(' ');
              return {
                name: line.slice(0, separator),
                time: Number(line.slice(separator + 1))
              };
            })
            .filter(branch => branch.name !== 'origin/HEAD');
          if (!branches.length)
            throw new Error('Repozitář nemá žádné vzdálené branche.');

          const submissions = branches.filter(
            branch => branch.name !== 'origin/main'
          );
          if (!submissions.length) {
            await rm(directory, { recursive: true, force: true });
            recordResult(row, 'Neodevzdáno');
            continue;
          }

          submissions.sort(
            (a, b) => b.time - a.time || a.name.localeCompare(b.name)
          );
          const selected = submissions[0].name;
          await git(['-C', directory, 'switch', '--track', selected]);
          recordResult(row, 'Odevzdáno');
        } catch {
          failed++;
          // Smazat pouze námi vytvořený, nedokončený klon. Při chybě kontroly
          // branchí raději ponechat repozitář k ručnímu prozkoumání.
          if (createdDirectory && !cloneCompleted) {
            try {
              await rm(directory, { recursive: true, force: true });
            } catch {
              // Při neúspěšném úklidu nechat adresář k ruční kontrole.
            }
          }
          recordResult(row, 'Chyba');
        }
      }
    } finally {
      if (askpassDirectory)
        await rm(askpassDirectory, { recursive: true, force: true });
    }
    const table = [
      '| Student | Stav |',
      '| --- | --- |',
      ...results.map(
        ({ name, status }) => `| ${markdownCell(name)} | ${status} |`
      )
    ];
    await writeFile(
      join(outputDirectory, 'RESULTS.md'),
      `${table.join('\n')}\n`
    );
    if (failed) process.exitCode = 1;
  } finally {
    db.close();
  }
}

main().catch(err => {
  console.error(err.message);
  process.exitCode = 1;
});
