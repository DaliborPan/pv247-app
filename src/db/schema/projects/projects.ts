import { randomUUID } from 'crypto';

import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { dbProjectStatusSchema } from './project-status';

export const projects = sqliteTable('project', {
  id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  description: text('description'),
  shortDescription: text('short_description'),
  github: text('github'),
  points: integer('points'),
  comment: text('comment'),

  status: text('status', { enum: dbProjectStatusSchema.options })
    .notNull()
    .default('pending' as const),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export type ProjectInsert = typeof projects.$inferInsert;
