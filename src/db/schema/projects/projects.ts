import { randomUUID } from 'crypto';

import { sql } from 'drizzle-orm';
import { check, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { projectAssignmentSchema } from '@/modules/project-example/assignments';
import { projectStatusSchema } from '@/modules/project/schema';

export const projects = sqliteTable(
  'project',
  {
    id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
    name: text('name').notNull(),
    // A null assignment identifies a project with the team's own topic.
    assignment: text('assignment', { enum: projectAssignmentSchema.options }),
    description: text('description'),
    shortDescription: text('short_description'),
    github: text('github'),
    comment: text('comment'),

    status: text('status', { enum: projectStatusSchema.options })
      .notNull()
      .default('CREATED' as const),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`)
  },
  table => [
    check(
      'project_assignment_check',
      sql`${table.assignment} IS NULL OR ${table.assignment} IN ('meal-planner', 'therapist-booking')`
    )
  ]
);
