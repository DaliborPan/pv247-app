import React from 'react';

import { getOrderedLectures } from '@/modules/lecture/server';
import { getIsAvailable } from '@/modules/lecture/utils';
import { getUserHomeworks } from '@/modules/homework/server';

import { getProject } from './project';

export const getUserOverview = React.cache(
	async (userId: string, projectId?: string | null) => {
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
				userHomeworks
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
