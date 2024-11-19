import { randomUUID } from 'crypto';

import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

/**
 * Project status
 */
export const projectStatusSchema = z.enum(['pending', 'approved', 'submitted']);

export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projects = sqliteTable('project', {
  id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  description: text('description'),
  github: text('github'),
  points: integer('points'),
  comment: text('comment'),

  status: text('status', { enum: projectStatusSchema.options }).$default(
    () => 'pending'
  ),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export type Project = typeof projects.$inferSelect;

export type ProjectInsert = typeof projects.$inferInsert;
