import { getSessionUser } from '@/modules/session-user';

import { getStudentQuery, lectorQueries } from './server';

const getStudentsWithHomework = async () => {
  const sessionUser = await getSessionUser();

  return lectorQueries.getStudentsWithHomework(sessionUser);
};

const getStudent = async (studentId: Promise<string>) => {
  const sessionUser = await getSessionUser();

  return getStudentQuery(sessionUser, await studentId);
};

export const lectorLoaders = {
  getStudentsWithHomework,
  getStudent
};

export type GetStudentsWithHomeworkLoaderResult = Awaited<
  ReturnType<typeof getStudentsWithHomework>
>;
