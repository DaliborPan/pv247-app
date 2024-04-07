import { randomUUID } from 'crypto';

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { type HomeworkSlug } from '@/schema/homework';
import { type LectureSlug } from '@/schema/lecture';

export const lectures = sqliteTable('lecture', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	availableFrom: text('availableFrom').notNull(),
	slug: text('slug').$type<LectureSlug>().notNull(),
	preview: text('preview').notNull().default(''),

	// homework
	homeworkName: text('homeworkName').notNull().default(''),
	homeworkSlug: text('homeworkSlug').$type<HomeworkSlug>().notNull(),
	homeworkPreview: text('homeworkPreview').notNull().default(''),
	homeworkClassroomLink: text('homeworkClassroomLink').notNull().default('')
});

export type Lecture = typeof lectures.$inferSelect;
