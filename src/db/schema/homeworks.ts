import { randomUUID } from 'crypto';

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const homeworks = sqliteTable('homework', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	points: integer('points').notNull(),
	maxPoints: integer('maxPoints').notNull(),
	availableFrom: text('availableFrom').notNull().default(''),

	// student
	studentId: text('studentId'),
	studentName: text('studentName'),

	// lector
	lectorId: text('lectorId'),
	lectorName: text('lectorName'),

	// lecture
	lectureId: text('lectureId')
});

export type Homework = typeof homeworks.$inferSelect;
