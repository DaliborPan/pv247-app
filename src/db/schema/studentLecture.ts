import { randomUUID } from 'crypto';

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const studentLectures = sqliteTable('studentLecture', {
  id: text('id').notNull().primaryKey().$defaultFn(randomUUID),

  // student
  studentId: text('studentId'),

  // lecture
  lectureId: text('lectureId')
});

export type StudentLectureInsertType = typeof studentLectures.$inferInsert;
