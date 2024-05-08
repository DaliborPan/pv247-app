import { getSessionUser } from '@/auth';

import { db } from '..';
import { getIsAvailable } from '../query/lectures';

export const getSessionUserOverview = async () => {
	const sessionUser = await getSessionUser();

	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
		with: {
			homeworks: {
				where: (homeworks, { eq }) => eq(homeworks.studentId, sessionUser.id)
			}
		}
	});

	const availableLength = lectures.filter(getIsAvailable).length;

	const awardedHomeworksLength = lectures.filter(
		lecture => !!lecture.homeworks.at(0)
	).length;

	const totalPoints = lectures.reduce((acc, lecture) => {
		const homework = lecture.homeworks.at(0);

		return acc + (homework?.points ?? 0);
	}, 0);

	const userWithProject = await db.query.users.findFirst({
		where: (user, { eq }) => eq(user.id, sessionUser.id),
		with: {
			project: true
		}
	});

	const project = userWithProject?.project;

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
};
