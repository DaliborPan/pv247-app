import { randomUUID } from 'crypto';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex
} from 'drizzle-orm/sqlite-core';

import { studentHomeworkStatusSchema } from '@/modules/student-homework/schema';

import { lectures } from './lectures/lectures';
import { user as users } from './users/users';

export const studentHomeworks = sqliteTable(
  'studentHomework',
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
      enum: studentHomeworkStatusSchema.options
    })
      .notNull()
      .default('pending'),
    invitationId: integer('invitationId'),
    lastError: text('lastError'),
    points: integer('points'),
    gradedBy: text('gradedBy').references(() => users.id),
    gradedAt: integer('gradedAt', { mode: 'timestamp_ms' }),
    createdAt: integer('createdAt', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
  },
  table => [
    uniqueIndex('studentHomework_lecture_student_unique').on(
      table.lectureId,
      table.studentId
    )
  ]
);

export type StudentHomeworkInsertType = typeof studentHomeworks.$inferInsert;
export type StudentHomeworkSelectType = typeof studentHomeworks.$inferSelect;
