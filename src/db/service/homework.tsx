import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';
import { db } from '@/db';

export const getHomeworks = cache(async () => {
	const sessionUser = await getSessionUser();

	return await db.query.homeworks.findMany({
		where: (homeworks, { eq }) => eq(homeworks.studentId, sessionUser.id)
	});
});
