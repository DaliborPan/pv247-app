import { type SessionUserType } from '@/modules/session-user/types';

import { lectureRepository } from '@/modules/lecture/server/repository';
import { projectRepository } from '@/modules/project/server';
import { studentLectureRepository } from '@/modules/student-lecture/server';
import { type UserType } from '@/modules/user/schema';

import { getProjectFormStudents } from './repository';
import { homeworkRepository } from '@/modules/homework/server';

export const getProjectFormStudentComboboxQuery = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);

const getOverview = async (sessionUser: SessionUserType, user: UserType) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== user.id) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to view user ${user.id}`
    );
  }

  const homework = await homeworkRepository.getMany({ userId: user.id });
  const awardedHomeworkCount = homework.length;
  const homeworkTotalPoints = homework.reduce(
    (acc, h) => acc + (h?.points ?? 0),
    0
  );

  const lectures = await lectureRepository.getOrdered();

  const project = !user.projectId
    ? undefined
    : (await projectRepository.getMany()).find(
        project => project.id === user.projectId
      );

  const attendances = await studentLectureRepository.getMany(user.id);

  return {
    lecturesCount: lectures.length,

    awardedHomeworkCount,
    homework,
    homeworkTotalPoints,

    project,

    totalPoints: homeworkTotalPoints + (project?.points ?? 0),
    attendances
  };
};

export const studentQueries = {
  getProjectFormStudentCombobox: getProjectFormStudentComboboxQuery,
  getOverview
};
