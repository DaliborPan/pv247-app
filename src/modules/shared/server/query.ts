import { type User } from '@/db';
import { getHomework } from '@/modules/homework/server';
import { getOrderedLectures } from '@/modules/lecture/server';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { getProject } from '@/modules/project/server';
import { type SessionUserType } from '@/modules/session-user/types';
import { getStudentLectures } from '@/modules/student-lecture/server';

/**
 * Get overview by userId
 */
export const getUserOverviewQuery = async (
  sessionUser: SessionUserType,
  user: User
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== user.id) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to view user ${user.id}`
    );
  }

  const userHomeworks = await getHomework({ userId: user.id });
  const awardedHomeworksLength = userHomeworks.length;

  const lectures = await getOrderedLectures();
  const availableLength = lectures.filter(checkIsAvailable).length;

  const totalPoints = userHomeworks.reduce(
    (acc, homework) => acc + (homework?.points ?? 0),
    0
  );

  const project = !user.projectId
    ? undefined
    : await getProject(user.projectId);

  const attendances = await getStudentLectures({ studentId: user.id });

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
};
