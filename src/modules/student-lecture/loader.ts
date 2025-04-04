import { getSessionUser } from '@/modules/session-user';

import {
  getStudentLecturesQuery,
  processAcceptMineAttendanceMutation
} from './server';

export const getStudentLecturesLoader = async ({
  userId
}: {
  userId: string;
}) => {
  const sessionUser = await getSessionUser();

  return getStudentLecturesQuery(sessionUser, { userId });
};

export const processAcceptMineAttendanceLoader = async ({
  lectureId
}: {
  lectureId: string;
}) => {
  const sessionUser = await getSessionUser();

  // special case of calling mutation inside loader
  await processAcceptMineAttendanceMutation(sessionUser, lectureId);
};
