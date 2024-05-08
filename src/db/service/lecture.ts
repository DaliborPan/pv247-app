import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';
import { db } from '@/db';

export const getAvailableLecturesWithHomework = cache(async () => {
	const sessionUser = await getSessionUser();

	return await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
		with: {
			homeworks: {
				where: (homeworks, { eq }) => eq(homeworks.studentId, sessionUser.id)
			}
		}
	});
});
