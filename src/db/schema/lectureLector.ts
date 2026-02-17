import { randomUUID } from 'crypto';

import { sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import { lectures } from './lectures';
import { users } from './users';

export const lectureLectors = sqliteTable(
  'lectureLector',
  {
    id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
    lectureId: text('lectureId')
      .notNull()
      .references(() => lectures.id),
    lectorId: text('lectorId')
      .notNull()
      .references(() => users.id)
  },
  table => [unique().on(table.lectureId, table.lectorId)]
);

export type LectureLectorInsertType = typeof lectureLectors.$inferInsert;
