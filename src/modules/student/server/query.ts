import { type SessionUserType } from '@/modules/session-user/types';
import { getHomework } from '@/modules/homework/server';
import { getOrderedLecturesCached } from '@/modules/lecture/server';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { getProjectsCached } from '@/modules/project/server';
import { getStudentLecturesCached } from '@/modules/student-lecture/server';
import { type UserType } from '@/modules/user/schema';

import { getProjectFormStudents } from './repository';

export const getProjectFormStudentComboboxQuery = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);

export const getStudentOverviewQuery = async (
  sessionUser: SessionUserType,
  user: UserType
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== user.id) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to view user ${user.id}`
    );
  }

  const userHomeworks = await getHomework({ userId: user.id });
  const awardedHomeworksLength = userHomeworks.length;

  const lectures = await getOrderedLecturesCached();
  const availableLength = lectures.filter(checkIsAvailable).length;

  const totalPoints = userHomeworks.reduce(
    (acc, homework) => acc + (homework?.points ?? 0),
    0
  );

  const project = !user.projectId
    ? undefined
    : (await getProjectsCached()).find(
        project => project.id === user.projectId
      );

  const attendances = await getStudentLecturesCached(user.id);

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
