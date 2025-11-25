import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type UserType } from '@/modules/user/schema';
import { homeworkQueries } from '@/modules/homework/server';
import { lectureQueries } from '@/modules/lecture/server';
import { projectQueries } from '@/modules/project/server';
import { getStudentLecturesQuery } from '@/modules/student-lecture/server';

import { getProjectFormStudentComboboxQuery } from './server';

/**
 * Loads students, that are not assigned to a project and are not the current user.
 *
 * Students, that are already assigned to the project are also included.
 */
export const getProjectFormStudentComboboxLoader = async (
  projectId: string | undefined
) => {
  const sessionUser = await getSessionUser();

  return getProjectFormStudentComboboxQuery(sessionUser, projectId);
};

const getOverview = async (user: UserType) => {
  const sessionUser = await getSessionUser();

  const [homework, lectures, attendances] = await Promise.all([
    homeworkQueries.getMany(sessionUser, { userId: user.id }),
    lectureQueries.getOrdered(),
    getStudentLecturesQuery(sessionUser, { userId: user.id })
  ]);

  // Získání projektu pokud existuje
  const project = user.projectId
    ? await projectQueries.get(sessionUser, user.projectId)
    : undefined;

  // Agregace dat
  const awardedHomeworkCount = homework.length;
  const homeworkTotalPoints = homework.reduce(
    (acc, h) => acc + (h?.points ?? 0),
    0
  );

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

const getMineOverview = cache(async () => {
  const sessionUser = await getSessionUser();

  return getOverview(sessionUser);
});

export const studentLoaders = {
  getMineOverview,
  getOverview
};
