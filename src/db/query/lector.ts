import { eq } from 'drizzle-orm';

import { db } from '..';

/**
 * When new student is created, assign it to the lector with the least amount of students.
 */
export const getNewStudentLectorId = async () => {
	const lectors = await db.query.users.findMany({
		where: users => eq(users.role, 'lector'),
		with: {
			students: true
		}
	});

	if (!lectors.length) {
		throw new Error('No lectors found in the database');
	}

	return lectors.reduce((acc, lector) => {
		if (lector.students.length < acc.students.length) {
			return lector;
		}

		return acc;
	}, lectors[0]).id;
};
