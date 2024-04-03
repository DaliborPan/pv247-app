import { randomUUID } from 'crypto';

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const lectures = sqliteTable('lecture', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	availableFrom: text('availableFrom').notNull(),
	slug: text('slug').notNull().default(''),

	// homework
	homeworkName: text('homeworkName').notNull().default(''),
	homeworkPreview: text('homeworkPreview').notNull().default('')
});

export type Lecture = typeof lectures.$inferSelect;
