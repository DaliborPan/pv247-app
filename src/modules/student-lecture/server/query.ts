import { type SessionUserType } from '@/modules/session-user/types';

import { getStudentLectures } from './repository';

export const getStudentLecturesQuery = async (
  sessionUser: SessionUserType,
  { lectureId, userId }: { lectureId?: string; userId?: string }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error('Unauthorized');
  }

  return getStudentLectures({ lectureId, studentId: userId });
};
