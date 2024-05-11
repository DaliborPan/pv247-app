import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';

import { getIsAvailable } from '../query/lectures';
import { getProject } from '../query/project';

import { getOrderedLecturesWithHomework } from './lecture';

export const getSessionUserOverview = cache(async () => {
	const sessionUser = await getSessionUser();
	const lectures = await getOrderedLecturesWithHomework();

	const availableLength = lectures.filter(getIsAvailable).length;

	const awardedHomeworksLength = lectures.filter(
		lecture => !!lecture.homeworks.at(0)
	).length;

	const totalPoints = lectures.reduce((acc, lecture) => {
		const homework = lecture.homeworks.at(0);

		return acc + (homework?.points ?? 0);
	}, 0);

	const project = !sessionUser.projectId
		? undefined
		: await getProject(sessionUser.projectId);

	return {
		lectures: {
			display: `${availableLength}/${lectures.length}`,
			availableLength,
			lectures
		},
		homeworks: {
			display: `${awardedHomeworksLength}/${lectures.length} | ${totalPoints}p`,
			awardedHomeworksLength,
			totalPoints
		},
		project: {
			display: !project
				? 'No project'
				: project.status === 'pending'
					? 'Pending'
					: project.status === 'approved'
						? 'Approved'
						: 'Submitted',
			project
		},
		totalPoints: totalPoints + (project?.points ?? 0)
	};
});
