import { randomUUID } from 'crypto';

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

/**
 * Lecture slug
 */
export const lectureSlugSchema = z.enum(['introduction', 'react', 'styling']);

export type LectureSlug = z.infer<typeof lectureSlugSchema>;

/**
 * Homework slug
 */
export const homeworkSlugSchema = z.enum([
	'typescript',
	'react',
	'tailwindcss'
]);

export type HomeworkSlug = z.infer<typeof homeworkSlugSchema>;

/**
 * Lectures
 */
export const lectures = sqliteTable('lecture', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	availableFrom: text('availableFrom').notNull(),
	slug: text('slug', { enum: lectureSlugSchema.options }).notNull(),
	preview: text('preview').notNull().default(''),

	// homework
	homeworkName: text('homeworkName').notNull().default(''),
	homeworkSlug: text('homeworkSlug', {
		enum: homeworkSlugSchema.options
	}).notNull(),
	homeworkPreview: text('homeworkPreview').notNull().default(''),
	homeworkClassroomLink: text('homeworkClassroomLink').notNull().default(''),
	homeworkMaxPoints: integer('homeworkMaxPoints').notNull().default(0)
});

export type Lecture = typeof lectures.$inferSelect;
