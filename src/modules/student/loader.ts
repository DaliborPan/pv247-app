import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type UserType } from '@/modules/user/schema';
import { getStudentHomeworks } from '@/modules/homework/queries';

import { getStudentProject } from '@/modules/project/queries';

import { studentQueries } from './server';

import { getStudentLectures } from '@/modules/student-lecture/queries';

const getOverview = async (user: Pick<UserType, 'id'>) => {
  const [homework, attendances, project] = await Promise.all([
    getStudentHomeworks(user.id),
    getStudentLectures(user.id),
    getStudentProject(user.id)
  ]);

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
    totalPoints: homeworkTotalPoints,
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

const listStudents = async () => {
  const sessionUser = await getSessionUser();

  return studentQueries.listStudents(sessionUser);
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
  listStudents,
  getStudentsWithHomework
};
