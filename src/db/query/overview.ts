import { cache } from 'react';

import { getIsAvailable, getOrderedLectures } from './lectures';
import { getProject } from './project';
import { getUserHomeworks } from './homeworks';

export const getUserOverview = cache(
	async ({
		userId,
		projectId
	}: {
		userId: string;
		projectId: string | null;
	}) => {
		const userHomeworks = await getUserHomeworks(userId);
		const awardedHomeworksLength = userHomeworks.length;

		const lectures = await getOrderedLectures();
		const availableLength = lectures.filter(getIsAvailable).length;

		const totalPoints = userHomeworks.reduce(
			(acc, homework) => acc + (homework?.points ?? 0),
			0
		);

		const project = !projectId ? undefined : await getProject(projectId);

		return {
			lectures: {
				display: `${availableLength}/${lectures.length}`,
				availableLength,
				lectures: lectures.map(lecture => ({
					...lecture,
					homeworks: lecture.homeworks.filter(homework =>
						userHomeworks.some(userHomework => userHomework.id === homework.id)
					)
				}))
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
	}
);

export type GetUserOverviewResult = Awaited<ReturnType<typeof getUserOverview>>;
