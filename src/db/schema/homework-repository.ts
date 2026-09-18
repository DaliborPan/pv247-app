import { randomUUID } from 'crypto';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core';

import { homeworkRepositoryStatusSchema } from '@/modules/homework-repository/schema';

import { lectures } from './lectures/lectures';
import { user as users } from './users/users';

export const homeworkRepositories = sqliteTable(
  'homework_repository',
  {
    id: text('id').primaryKey().$defaultFn(randomUUID),
    lectureId: text('lectureId')
      .notNull()
      .references(() => lectures.id),
    studentId: text('studentId')
      .notNull()
      .references(() => users.id),
    githubUserId: text('githubUserId').notNull(),
    repositoryName: text('repositoryName').notNull(),
    githubRepositoryId: integer('githubRepositoryId'),
    repositoryUrl: text('repositoryUrl'),
    initialCommitSha: text('initialCommitSha'),
    status: text('status', {
      enum: homeworkRepositoryStatusSchema.options
    })
      .notNull()
      .default('pending'),
    invitationId: integer('invitationId'),
    lastError: text('lastError'),
    createdAt: integer('createdAt', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
  },
  table => [
    uniqueIndex('homework_repository_lecture_student_unique').on(
      table.lectureId,
      table.studentId
    )
  ]
);

export type HomeworkRepositoryInsertType =
  typeof homeworkRepositories.$inferInsert;
export type HomeworkRepositorySelectType =
  typeof homeworkRepositories.$inferSelect;
