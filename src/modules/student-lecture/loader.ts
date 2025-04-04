import { getSessionUser } from '@/modules/session-user';

import { getStudentLecturesQuery } from './server';

export const getStudentLecturesLoader = async ({
  userId
}: {
  userId: string;
}) => {
  const sessionUser = await getSessionUser();

  return getStudentLecturesQuery(sessionUser, { userId });
};
