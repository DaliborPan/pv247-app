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

export const getMineStudentLecturesLoader = async ({
  lectureId
}: {
  lectureId: string;
}) => {
  const sessionUser = await getSessionUser();

  return getStudentLecturesQuery(sessionUser, {
    lectureId,
    userId: sessionUser.id
  });
};
