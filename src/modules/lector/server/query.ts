import { db } from '@/db';

/**
 * When new student is created, assign it to the lector
 * with the least amount of students.
 */
export const getNewStudentLectorId = async () => {
	const lectors = await db.query.users.findMany({
		where: (users, { eq }) => eq(users.role, 'lector'),
		with: {
			students: true
		}
	});

	if (!lectors.length) {
		throw new Error('No lectors found in the database');
	}

	const reviewers = lectors.filter(
		lector =>
			lector.email === 'jakubhonig@gmail.com' ||
			lector.email === 'janskamirek@seznam.cz'
	);

	return reviewers.reduce((acc, lector) => {
		if (lector.students.length < acc.students.length) {
			return lector;
		}

		return acc;
	}, lectors[0]).id;
};
