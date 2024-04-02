import { randomUUID } from 'crypto';

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('project', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	description: text('description')
});

export type Project = typeof projects.$inferSelect;
