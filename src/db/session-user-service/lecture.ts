import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';
import { getOrderedLectures } from '@/modules/lecture/server';

export const getOrderedLecturesWithHomework = cache(async () => {
	const sessionUser = await getSessionUser();
	const lectures = await getOrderedLectures();

	return lectures.map(lecture => ({
		...lecture,
		homeworks: lecture.homeworks.filter(
			homework => homework.studentId === sessionUser.id
		)
	}));
});
