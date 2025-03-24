import { getSessionUser } from '@/modules/session-user/server';

import {
  getMineStudentsQuery,
  getStudentQuery,
  getStudentsWithHomeworkQuery
} from './query';

export const getMineStudentsLoader = async () => {
  const sessionUser = await getSessionUser();

  return getMineStudentsQuery(sessionUser);
};

export const getStudentsWithHomeworkLoader = async () => {
  const sessionUser = await getSessionUser();

  return getStudentsWithHomeworkQuery(sessionUser);
};

export type GetStudentsWithHomeworkLoaderResult = Awaited<
  ReturnType<typeof getStudentsWithHomeworkLoader>
>;

export const getStudentLoader = async (id: string) => {
  const sessionUser = await getSessionUser();

  return getStudentQuery(sessionUser, id);
};
