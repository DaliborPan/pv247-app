import { type SessionUserType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

export const getUserHomeworkQuery = async (
  sessionUser: SessionUserType,
  {
    lectureId,
    userId
  }: {
    lectureId?: string;
    userId: string;
  }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to get homework for user ${userId}`
    );
  }

  const userHomework = await homeworkRepository.getMany({ userId });

  if (lectureId) {
    return userHomework.filter(homework => homework.lectureId === lectureId);
  }

  return userHomework;
};
