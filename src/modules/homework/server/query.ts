import { type SessionUserType } from '@/modules/session-user/types';

import { getHomework } from './repository';

/**
 * Get homework by userId and lectureId
 */
export const getUserHomeworkQuery = async (
  sessionUser: SessionUserType,
  {
    userId,
    lectureId
  }: {
    userId: string;
    lectureId: string;
  }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to get homework for user ${userId}`
    );
  }

  const homework = await getHomework({ lectureId, userId });
  return homework.at(0);
};
