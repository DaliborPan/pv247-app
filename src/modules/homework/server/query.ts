import { type SessionUserType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

const getMany = async (
  sessionUser: SessionUserType,
  { userId, lectureId }: { userId?: string; lectureId?: string }
) => {
  if (sessionUser.role !== 'lector') {
    if (userId === sessionUser.id) {
      return homeworkRepository.getMany({ userId });
    }

    throw new Error(`Unauthorized`);
  }

  return homeworkRepository.getMany({ lectureId });
};

export const homeworkQueries = {
  getMany
};
