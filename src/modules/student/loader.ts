import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type UserType } from '@/modules/user/schema';
import { homeworkQueries } from '@/modules/homework/server';

import { projectQueries } from '@/modules/project/server';

import { studentQueries } from './server';

import { studentLectureQueries } from '../student-lecture/server';

/**
 * Loads students, that are not assigned to a project and are not the current user.
 *
 * Students, that are already assigned to the project are also included.
 */
export const getProjectFormStudentComboboxOptions = async (
  projectId: string | undefined
) => {
  const sessionUser = await getSessionUser();

  return studentQueries.getProjectFormStudentComboboxOptions(
    sessionUser,
    projectId
  );
};

const getOverview = async (user: UserType) => {
  const sessionUser = await getSessionUser();

  const [homework, attendances] = await Promise.all([
    homeworkQueries.getMany(sessionUser, { userId: user.id }),
    studentLectureQueries.getMany(sessionUser, { userId: user.id })
  ]);

  const project = user.projectId
    ? await projectQueries.get(sessionUser, { userId: user.id })
    : undefined;

  const awardedHomeworkCount = homework.length;
  const homeworkTotalPoints = homework.reduce(
    (acc, h) => acc + (h?.points ?? 0),
    0
  );

  return {
    awardedHomeworkCount,
    homework,
    homeworkTotalPoints,
    project,
    totalPoints: homeworkTotalPoints + (project?.points ?? 0),
    attendances
  };
};

const getMineOverview = cache(async () => {
  const sessionUser = await getSessionUser();

  return getOverview(sessionUser);
});

const getMany = async () => {
  const sessionUser = await getSessionUser();

  return studentQueries.getMany(sessionUser);
};

const get = async (studentId: Promise<string>) => {
  const sessionUser = await getSessionUser();

  return studentQueries.get(sessionUser, await studentId);
};

const getManyWithHomework = async () => {
  const sessionUser = await getSessionUser();

  return studentQueries.getManyWithHomework(sessionUser);
};

const getStudentsWithHomework = async ({
  lectureId
}: {
  lectureId: string;
}) => {
  const sessionUser = await getSessionUser();

  return studentQueries.getManyWithHomework(sessionUser, {
    lectureId
  });
};

export const studentLoaders = {
  getMany,
  get,
  getMineOverview,
  getOverview,
  getManyWithHomework,
  getStudentsWithHomework,
  getProjectFormStudentComboboxOptions
};
