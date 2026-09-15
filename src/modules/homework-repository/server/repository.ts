import 'server-only';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import {
  homeworkRepositories,
  type HomeworkRepositoryInsertType
} from '@/db/schema/homework-repository';

const get = (lectureId: string, studentId: string) =>
  db.query.homeworkRepositories.findFirst({
    where: and(
      eq(homeworkRepositories.lectureId, lectureId),
      eq(homeworkRepositories.studentId, studentId)
    )
  });

const update = (
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

const getManyForStudent = (studentId: string) =>
  db
    .select({
      lectureId: homeworkRepositories.lectureId,
      repositoryUrl: homeworkRepositories.repositoryUrl,
      status: homeworkRepositories.status
    })
    .from(homeworkRepositories)
    .where(eq(homeworkRepositories.studentId, studentId));

export const homeworkRepositoryRepository = { get, update, getManyForStudent };
