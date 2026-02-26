import { randomUUID } from 'crypto';

import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import { lectures } from './lectures';
import { users } from './users';
import { dbLectureLectorStatusSchema } from './lecture-lector-status';

export const lectureLectors = sqliteTable(
  'lectureLector',
  {
    id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
    lectureId: text('lectureId')
      .notNull()
      .references(() => lectures.id),
    lectorId: text('lectorId')
      .notNull()
      .references(() => users.id),
    status: text('status', { enum: dbLectureLectorStatusSchema.options })
      .notNull()
      .default('CAN_TEACH'),
    isApproved: integer('isApproved', { mode: 'boolean' })
      .notNull()
      .default(false)
  },
  table => [unique().on(table.lectureId, table.lectorId)]
);

export type LectureLectorInsertType = typeof lectureLectors.$inferInsert;
