import { type SessionUserType } from '@/modules/session-user/types';

import { getHomework } from './repository';

export const getUserHomeworkQuery = async (
  sessionUser: SessionUserType,
  {
    lectureId,
    userId
  }: Required<NonNullable<Parameters<typeof getHomework>[0]>>
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to get homework for user ${userId}`
    );
  }

  const homework = await getHomework({ lectureId, userId });
  return homework.at(0);
};
