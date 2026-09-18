'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { account } from '@/db/schema/users/users';
import {
  homeworkRepositories,
  type HomeworkRepositoryInsertType,
  type HomeworkRepositorySelectType
} from '@/db/schema/homework-repository';
import {
  createGithubClient,
  githubOrganization,
  GithubSetupError
} from '@/integrations/github/client';
import { type SessionUserType } from '@/modules/session-user/types';
import { type LectureType } from '@/modules/lecture/types';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';
import { authStudentServerAction } from '@/server/server-actions';

import { ownHomeworkRepositoryInputSchema } from '../../schema';
import { type HomeworkRepositoryResultType } from '../../types';

type HomeworkRepositoryInputType = {
  lectureId: string;
  studentId: string;
};

type HomeworkRepositoryContextType = HomeworkRepositoryInputType & {
  record: HomeworkRepositorySelectType | undefined;
  setRecord: (record: HomeworkRepositorySelectType) => void;
  lecture: Pick<
    LectureType,
    'homeworkTemplateRepositoryUrl' | 'homeworkSlug'
  >;
  github: ReturnType<typeof createGithubClient>;
  githubUserId: string;
  githubLogin: string;
};

const updateHomeworkRepository = (
  id: string,
  values: Partial<
    Pick<
      HomeworkRepositoryInsertType,
      | 'githubRepositoryId'
      | 'repositoryName'
      | 'repositoryUrl'
      | 'initialCommitSha'
      | 'status'
      | 'invitationId'
      | 'lastError'
    >
  >
) =>
  db
    .update(homeworkRepositories)
    .set(values)
    .where(eq(homeworkRepositories.id, id));

const withHomeworkRepositoryContext = async (
  user: SessionUserType,
  { lectureId, studentId }: HomeworkRepositoryInputType,
  operation: (
    context: HomeworkRepositoryContextType
  ) => Promise<HomeworkRepositoryResultType>
): Promise<HomeworkRepositoryResultType> => {
  if (user.role !== 'student' || user.id !== studentId) {
    throw new Error('Unauthorized');
  }

  let record: HomeworkRepositorySelectType | undefined;

  try {
    // Completed assignments do not need any more GitHub requests.
    record = await db.query.homeworkRepositories.findFirst({
      where: and(
        eq(homeworkRepositories.lectureId, lectureId),
        eq(homeworkRepositories.studentId, studentId)
      )
    });
    if (record?.status === 'ready') {
      if (!record.repositoryUrl)
        throw new GithubSetupError(
          'The saved repository URL is missing. Contact an administrator.'
        );
      return { status: 'ready', repositoryUrl: record.repositoryUrl };
    }
    // Use the linked OAuth identity, not the editable profile nickname.
    const [lecture, student, accounts] = await Promise.all([
      db.query.lectures.findFirst({
        columns: {
          homeworkSlug: true,
          homeworkTemplateRepositoryUrl: true
        },
        where: (table, { eq }) => eq(table.id, lectureId)
      }),
      db.query.users.findFirst({
        columns: { role: true },
        where: (table, { eq }) => eq(table.id, studentId)
      }),
      db
        .select({ accountId: account.accountId })
        .from(account)
        .where(
          and(eq(account.userId, studentId), eq(account.providerId, 'github'))
        )
    ]);

    if (!lecture || !student || student.role !== 'student') {
      throw new GithubSetupError('Homework or student not found.');
    }
    if (accounts.length !== 1 || !/^\d+$/.test(accounts[0].accountId)) {
      throw new GithubSetupError(
        'The student must have exactly one verified GitHub account.'
      );
    }
    const githubUserId = accounts[0].accountId;
    if (record && record.githubUserId !== githubUserId) {
      throw new GithubSetupError(
        'The linked GitHub account has changed. An administrator must review this assignment.'
      );
    }

    const github = createGithubClient();
    // An overall budget also bounds multiple sequential API calls on Vercel.
    const signal = AbortSignal.timeout(45000);
    github.hook.before('request', options => {
      options.request = { ...options.request, signal };
    });
    const { data: githubUser } = await github.request(
      'GET /user/{account_id}',
      {
        account_id: Number(githubUserId)
      }
    );
    if (String(githubUser.id) !== githubUserId) {
      throw new GithubSetupError('Unable to verify the linked GitHub account.');
    }

    return await operation({
      lectureId,
      studentId,
      record,
      lecture,
      github,
      githubUserId,
      githubLogin: githubUser.login,
      setRecord: value => {
        record = value;
      }
    });
  } catch (error) {
    // Keep actionable errors in the DB without exposing raw API or database errors.
    const status =
      error && typeof error === 'object' && 'status' in error
        ? error.status
        : undefined;
    let message =
      'GitHub setup could not finish. Refresh the table and try again.';
    if (status === 401 || status === 403) {
      message =
        'GitHub denied the request or applied a rate limit. Check App permissions and organization policies, or try again later.';
    } else if (status === 404) {
      message =
        'GitHub could not find an account or repository, or the App cannot access it. Check the template and installation access.';
    } else if (status === 422) {
      message =
        'GitHub rejected the request. Check the repository name, invitation limits and organization policies.';
    } else if (error instanceof GithubSetupError) {
      message = error.message;
    }
    if (record) {
      try {
        await updateHomeworkRepository(record.id, {
          lastError: message
        });
      } catch {
        // Preserve the original user-facing error if the database is unavailable.
      }
    }
    throw new GithubSetupError(message);
  }
};

/**
 * Creates a private assignment repository from the homework template.
 *
 * Persists the target name before contacting GitHub and stores the repository
 * ID immediately after creation. It does not configure access; callers must
 * invoke `complete` after GitHub finishes copying the template.
 *
 * @throws {Error} When the caller is not the assigned student.
 * @throws {GithubSetupError} When the homework, student, linked GitHub account,
 * template, target name, or GitHub operation cannot be verified or completed.
 */
const create = (user: SessionUserType, input: HomeworkRepositoryInputType) =>
  withHomeworkRepositoryContext(user, input, async context => {
    const {
      lectureId,
      studentId,
      lecture,
      github,
      githubUserId,
      githubLogin,
      setRecord
    } = context;

    let { record } = context;
    if (record?.githubRepositoryId) {
      return { status: 'preparing' };
    }
    // Validate the source before reserving a target repository name.
    let source: URL;
    try {
      source = new URL(lecture.homeworkTemplateRepositoryUrl ?? '');
    } catch {
      throw new GithubSetupError(
        'Set a valid GitHub template URL for this homework in the database.'
      );
    }
    const match = source.pathname.match(
      /^\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)\/?$/
    );
    if (
      source.protocol !== 'https:' ||
      source.hostname !== 'github.com' ||
      source.port ||
      source.username ||
      source.password ||
      source.search ||
      source.hash ||
      !match
    ) {
      throw new GithubSetupError(
        'Use a template URL in the form https://github.com/owner/repository.'
      );
    }
    const templateOwner = match[1];
    const templateRepo = match[2].replace(/\.git$/, '');
    const { data: template } = await github.rest.repos.get({
      owner: templateOwner,
      repo: templateRepo
    });
    if (!template.is_template || template.archived || template.disabled) {
      throw new GithubSetupError(
        'The source must be an accessible, active template repository.'
      );
    }

    const legacyUrl = getHomeworkGithubUrl({
      githubName: githubLogin,
      homeworkSlug: lecture.homeworkSlug
    });
    const baseName = legacyUrl?.split('/').pop();
    const repositoryName =
      record?.repositoryName ??
      (baseName ? `2026-fall-${baseName}` : undefined);
    if (!repositoryName || repositoryName.length > 100) {
      throw new GithubSetupError(
        'Cannot determine a valid repository name for this homework.'
      );
    }

    if (!record) {
      // Persist the name so a manual retry refers to the same assignment.
      const [created] = await db
        .insert(homeworkRepositories)
        .values({
          lectureId,
          studentId,
          githubUserId,
          repositoryName
        })
        .onConflictDoNothing()
        .returning();
      if (!created) {
        throw new GithubSetupError(
          'An assignment already exists. Refresh the table before continuing.'
        );
      }
      record = created;
      setRecord(created);
    }

    // Never adopt an existing repository that is not linked in our database.
    let exists = false;
    try {
      await github.rest.repos.get({
        owner: githubOrganization,
        repo: repositoryName
      });
      exists = true;
    } catch (error) {
      if (
        !(
          error &&
          typeof error === 'object' &&
          'status' in error &&
          error.status === 404
        )
      )
        throw error;
    }
    if (exists) {
      throw new GithubSetupError(
        'The target repository already exists but is not linked to this assignment. Ask an administrator to verify it; it will not be overwritten.'
      );
    }

    // Never retry this POST blindly: GitHub may have created the repo before a timeout.
    const { data: repository } = await github.rest.repos.createUsingTemplate({
      template_owner: templateOwner,
      template_repo: templateRepo,
      owner: githubOrganization,
      name: repositoryName,
      private: true,
      include_all_branches: false
    });
    // Save the GitHub ID immediately; readiness and access belong to completion.
    await updateHomeworkRepository(record.id, {
      githubRepositoryId: repository.id,
      repositoryUrl: repository.html_url,
      status: 'repository_created',
      lastError: null
    });
    return { status: 'preparing' };
  });

/**
 * Finishes an existing assignment repository setup and grants the student write access.
 *
 * Verifies the stored private repository, records its initial commit, optionally
 * grants the teacher team access, and sends or reuses the student's invitation.
 * Returns `preparing` when GitHub has not finished copying the template yet.
 *
 * @throws {Error} When the caller is not the assigned student.
 * @throws {GithubSetupError} When no created repository exists, its ownership or
 * visibility is invalid, or a GitHub, account, or database operation fails.
 */
const complete = (user: SessionUserType, input: HomeworkRepositoryInputType) =>
  withHomeworkRepositoryContext(user, input, async context => {
    const { record, github, githubUserId, githubLogin } = context;
    // Completion is never allowed to generate another repository.
    if (!record?.githubRepositoryId)
      throw new GithubSetupError(
        'Create the repository before finishing its setup.'
      );
    const { data: repository } = await github.request(
      'GET /repositories/{repository_id}',
      {
        repository_id: record.githubRepositoryId
      }
    );
    if (
      repository.owner.login.toLowerCase() !==
        githubOrganization.toLowerCase() ||
      !repository.private ||
      repository.archived ||
      repository.disabled
    ) {
      throw new GithubSetupError(
        'The assigned repository must be active, private and owned by FI-PV247.'
      );
    }
    const target = { owner: githubOrganization, repo: repository.name };
    await updateHomeworkRepository(record.id, {
      repositoryName: repository.name,
      repositoryUrl: repository.html_url
    });

    if (!record.initialCommitSha) {
      // GitHub may still be copying the template. Check once, without waiting.
      let initialCommitSha: string;
      try {
        const { data: commit } = await github.rest.repos.getCommit({
          ...target,
          ref: repository.default_branch
        });
        initialCommitSha = commit.sha;
      } catch (error) {
        const status =
          error && typeof error === 'object' && 'status' in error
            ? error.status
            : undefined;
        if (status !== 409) throw error;
        await updateHomeworkRepository(record.id, {
          lastError: null
        });
        return { status: 'preparing' };
      }
      await updateHomeworkRepository(record.id, {
        initialCommitSha
      });
    }

    // Without a configured team, teachers rely on organization-owner access.
    const teamSlug = process.env.GITHUB_TEACHER_TEAM_SLUG;
    if (teamSlug) {
      await github.rest.teams.addOrUpdateRepoPermissionsInOrg({
        org: githubOrganization,
        team_slug: teamSlug,
        ...target,
        permission: 'push'
      });
    }

    // Reuse an invitation if a previous attempt stopped before saving success.
    let invitationId: number | null = null;
    const invitations = await github.paginate(
      github.rest.repos.listInvitations,
      { ...target, per_page: 100 }
    );
    const pendingInvitation = invitations.find(
      invitation => String(invitation.invitee?.id) === githubUserId
    );
    if (
      pendingInvitation?.permissions === 'write' ||
      pendingInvitation?.permissions === 'admin' ||
      pendingInvitation?.permissions === 'maintain'
    ) {
      invitationId = pendingInvitation.id;
    } else {
      const invitation = await github.rest.repos.addCollaborator({
        ...target,
        username: githubLogin,
        permission: 'push'
      });
      if (invitation.status === 201) invitationId = invitation.data.id;
    }
    await updateHomeworkRepository(record.id, {
      status: 'ready',
      invitationId,
      lastError: null
    });
    return { status: 'ready', repositoryUrl: repository.html_url };
  });

export const createOwnHomeworkRepositoryAction = authStudentServerAction
  .input(ownHomeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await create(ctx.sessionUserStudent, {
        lectureId: input.lectureId,
        studentId: ctx.sessionUserStudent.id
      });
      return { result, error: null };
    } catch (error) {
      return {
        error:
          error instanceof GithubSetupError
            ? error.message
            : 'Repository setup failed. Refresh and try again.'
      };
    } finally {
      refresh();
    }
  });

export const completeOwnHomeworkRepositoryAction = authStudentServerAction
  .input(ownHomeworkRepositoryInputSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const result = await complete(ctx.sessionUserStudent, {
        lectureId: input.lectureId,
        studentId: ctx.sessionUserStudent.id
      });
      return { result, error: null };
    } catch (error) {
      return {
        error:
          error instanceof GithubSetupError
            ? error.message
            : 'Repository setup failed. Refresh and try again.'
      };
    } finally {
      refresh();
    }
  });
