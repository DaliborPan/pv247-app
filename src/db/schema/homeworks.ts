import { randomUUID } from 'crypto';

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { users } from './users';

export const homeworks = sqliteTable('homework', {
	id: text('id').notNull().primaryKey().$defaultFn(randomUUID),
	name: text('name').notNull(),
	points: integer('points').notNull(),
	maxPoints: integer('maxPoints').notNull(),

	// student
	studentId: text('studentId').references(() => users.id, {
		onDelete: 'cascade'
	}),
	studentName: text('studentName'),

	// lector
	lectorId: text('lectorId').references(() => users.id, {
		onDelete: 'cascade'
	}),
	lectorName: text('lectorName')
});
