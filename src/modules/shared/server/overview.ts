import React from 'react';

import { getUserHomeworks } from '@/modules/homework/server';
import { getOrderedLectures } from '@/modules/lecture/server';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { getProject } from '@/modules/project/server';
import { getStudentLectures } from '@/modules/student-lecture/server';

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
    const availableLength = lectures.filter(checkIsAvailable).length;

    const totalPoints = userHomeworks.reduce(
      (acc, homework) => acc + (homework?.points ?? 0),
      0
    );

    const project = !projectId ? undefined : await getProject(projectId);

    const attendances = await getStudentLectures({ studentId: userId });

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
      totalPoints: totalPoints + (project?.points ?? 0),
      attendance: {
        display: `${attendances.length}/${lectures.length}`,
        attendances
      }
    };
  }
);

export type GetUserOverviewResult = Awaited<ReturnType<typeof getUserOverview>>;
