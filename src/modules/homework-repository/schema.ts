import { z } from 'zod';

import { dbHomeworkRepositoryStatusSchema } from '@/db/schema/homework-repository-status';

export const homeworkRepositoryStatusSchema = dbHomeworkRepositoryStatusSchema;
export type HomeworkRepositoryStatusType = z.infer<
  typeof homeworkRepositoryStatusSchema
>;

export const homeworkRepositorySchema = z.object({
  id: z.string(),
  lectureId: z.string(),
  studentId: z.string(),
  githubUserId: z.string(),
  repositoryName: z.string(),
  githubRepositoryId: z.number().nullable(),
  repositoryUrl: z.string().nullable(),
  initialCommitSha: z.string().nullable(),
  status: homeworkRepositoryStatusSchema,
  invitationId: z.number().nullable(),
  lastError: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type HomeworkRepositoryType = z.infer<typeof homeworkRepositorySchema>;

export const homeworkRepositoryInputSchema = z.object({
  lectureId: z.string().min(1),
  studentId: z.string().min(1)
});

export type HomeworkRepositoryInput = z.infer<
  typeof homeworkRepositoryInputSchema
>;

export type HomeworkRepositoryResult =
  | { status: 'preparing' }
  | { status: 'ready'; repositoryUrl: string };
