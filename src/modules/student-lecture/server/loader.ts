import { getSessionUser } from '@/modules/session-user/server';

import { getStudentLecturesQuery } from './query';

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
