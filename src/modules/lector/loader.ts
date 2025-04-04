import { getSessionUser } from '@/modules/session-user';

import { getStudentQuery, getStudentsWithHomeworkQuery } from './server';

export const getStudentsWithHomeworkLoader = async () => {
  const sessionUser = await getSessionUser();

  return getStudentsWithHomeworkQuery(sessionUser);
};

export type GetStudentsWithHomeworkLoaderResult = Awaited<
  ReturnType<typeof getStudentsWithHomeworkLoader>
>;

export const getStudentLoader = async (studentId: string) => {
  const sessionUser = await getSessionUser();

  return getStudentQuery(sessionUser, studentId);
};
