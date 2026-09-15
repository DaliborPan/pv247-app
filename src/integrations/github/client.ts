import 'server-only';

import { createPrivateKey } from 'crypto';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

export const githubOrganization = 'FI-PV247';

export class GithubSetupError extends Error {}

export const createGithubClient = () => {
  const appId = process.env.GITHUB_APP_ID?.trim();
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  const installationId = Number(process.env.GITHUB_APP_INSTALLATION_ID);

  if (
    !appId ||
    !/^\d+$/.test(appId) ||
    !privateKey ||
    !Number.isSafeInteger(installationId) ||
    installationId <= 0
  ) {
    throw new GithubSetupError(
      'GitHub App configuration is missing or invalid. Contact an administrator.'
    );
  }

  const pem = privateKey.replace(/\\n/g, '\n').trim();
  if (!pem.includes('\n') || !pem.includes('-----END ')) {
    throw new GithubSetupError(
      'GITHUB_APP_PRIVATE_KEY is incomplete. Set the entire PEM including BEGIN, all key lines and END. In a .env file, enclose the multiline value in double quotes.'
    );
  }

  let normalizedPrivateKey: string;
  try {
    const key = createPrivateKey(pem);
    if (key.asymmetricKeyType !== 'rsa') {
      throw new Error('Expected an RSA key');
    }
    normalizedPrivateKey = key
      .export({ type: 'pkcs8', format: 'pem' })
      .toString();
  } catch {
    throw new GithubSetupError(
      'GITHUB_APP_PRIVATE_KEY is not a valid unencrypted RSA private key. Use the full PEM downloaded from the GitHub App settings, not a Client secret or a file path.'
    );
  }

  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId,
      privateKey: normalizedPrivateKey,
      installationId
    },
    request: { timeout: 10000 }
  });
};
