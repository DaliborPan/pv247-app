import { randomUUID } from 'crypto';

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const homeworks = sqliteTable('homework', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	points: integer('points').notNull(),

	// student
	studentId: text('studentId'),

	// lector
	lectorId: text('lectorId'),

	// lecture
	lectureId: text('lectureId')
});

export type Homework = typeof homeworks.$inferSelect;
