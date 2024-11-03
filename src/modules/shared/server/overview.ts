import React from 'react';

import { getOrderedLectures, getIsAvailable } from '@/modules/lecture';
import { getUserHomeworks } from '@/modules/homework';
import { getProject } from '@/modules/project';

/**
 * Get overview by userId
 *
 * @cache React cache
 */
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
