import { type SessionUserType } from '@/modules/session-user/types';

import { getStudentLecturesCached } from './cache';

export const getStudentLecturesQuery = async (
  sessionUser: SessionUserType,
  { userId }: { userId: string }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error('Unauthorized');
  }

  return getStudentLecturesCached(userId);
};
