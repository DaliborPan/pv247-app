import { getSessionUser } from '@/modules/session-user';

import { getStudentQuery, lectorQueries } from './server';

const getStudentsWithHomework = async () => {
  const sessionUser = await getSessionUser();

  return lectorQueries.getStudentsWithHomework(sessionUser);
};

export const getStudentLoader = async (studentId: string) => {
  const sessionUser = await getSessionUser();

  return getStudentQuery(sessionUser, studentId);
};

export const lectorLoaders = {
  getStudentsWithHomework
};

export type GetStudentsWithHomeworkLoaderResult = Awaited<
  ReturnType<typeof getStudentsWithHomework>
>;
