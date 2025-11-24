import { type SessionUserType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

const getMany = async (
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

  const homework = await homeworkRepository.getMany({ userId });

  if (lectureId) {
    return homework.filter(hw => hw.lectureId === lectureId);
  }

  return homework;
};

export const homeworkQueries = {
  getMany
};
