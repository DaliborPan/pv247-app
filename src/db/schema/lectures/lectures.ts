import { v4 as uuid } from 'uuid';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import {
  lectureSlugSchema,
  homeworkSlugSchema
} from '@/modules/lecture/schema';

export const lectures = sqliteTable('lecture', {
  id: text('id').notNull().primaryKey().$defaultFn(uuid),
  name: text('name').notNull(),
  availableFrom: text('availableFrom').notNull(),
  slug: text('slug', { enum: lectureSlugSchema.options }).notNull(),
  preview: text('preview').notNull().default(''),
  attendanceToken: text('attendanceToken').notNull().default(''),
  isAvailable: integer('isAvailable', { mode: 'boolean' })
    .notNull()
    .default(false),

  // homework
  homeworkName: text('homeworkName').notNull().default(''),
  homeworkSlug: text('homeworkSlug', {
    enum: homeworkSlugSchema.options
  }).notNull(),
  homeworkPreview: text('homeworkPreview').notNull().default(''),
  homeworkTemplateRepositoryUrl: text('homeworkTemplateRepositoryUrl'),
  homeworkMaxPoints: integer('homeworkMaxPoints').notNull().default(0)
});
