'use server';

import { auth } from '@/auth';
import { db } from '@/db';

export const getHomeworkPointsAction = async (lectureId: string) => {
	const session = await auth();

	if (!session) {
		return {
			status: 'error',
			message: 'Unauthorized'
		} as const;
	}

	const row = await db.query.homeworks.findFirst({
		where: (table, { eq, and }) =>
			and(eq(table.lectureId, lectureId), eq(table.studentId, session.user.id))
	});

	if (!row) {
		return {
			status: 'pending',
			points: 0
		} as const;
	}

	return {
		status: 'scored',
		points: row.points
	} as const;
};
