import { randomUUID } from 'crypto';

import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

import { lectureLectorStatusSchema } from '@/modules/lecture-lector/schema';

import { lectures } from './lectures/lectures';
import { user as users } from './users/users';

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
    status: text('status', { enum: lectureLectorStatusSchema.options })
      .notNull()
      .default('CAN_TEACH'),
    isApproved: integer('isApproved', { mode: 'boolean' })
      .notNull()
      .default(false)
  },
  table => [unique().on(table.lectureId, table.lectorId)]
);
