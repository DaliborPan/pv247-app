import { v4 as uuid } from 'uuid';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { dbLectureSlugSchema } from './lecture-slug';
import { dbHomeworkSlugSchema } from './homework-slug';

export const lectures = sqliteTable('lecture', {
  id: text('id').notNull().primaryKey().$defaultFn(uuid),
  name: text('name').notNull(),
  availableFrom: text('availableFrom').notNull(),
  slug: text('slug', { enum: dbLectureSlugSchema.options }).notNull(),
  preview: text('preview').notNull().default(''),
  attendanceToken: text('attendanceToken').notNull().default(''),
  isAvailable: integer('isAvailable', { mode: 'boolean' })
    .notNull()
    .default(false),

  // homework
  homeworkName: text('homeworkName').notNull().default(''),
  homeworkSlug: text('homeworkSlug', {
    enum: dbHomeworkSlugSchema.options
  }).notNull(),
  homeworkPreview: text('homeworkPreview').notNull().default(''),
  homeworkClassroomLink: text('homeworkClassroomLink').notNull().default(''),
  homeworkMaxPoints: integer('homeworkMaxPoints').notNull().default(0),
  homeworkDeadline: text('homeworkDeadline').notNull().default('')
});
