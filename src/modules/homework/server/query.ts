import { type SessionUserType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

const getMany = async (
  sessionUser: SessionUserType,
  { userId, lectureId }: { userId?: string; lectureId?: string }
) => {
  if (userId) {
    if (sessionUser.role !== 'lector' && userId !== sessionUser.id) {
      throw new Error(`Unauthorized`);
    }

    return homeworkRepository.getMany({ userId });
  }
  if (sessionUser.role === 'lector') {
    if (lectureId) {
      return homeworkRepository.getMany({ lectureId });
    }

    return homeworkRepository.getMany({});
  }

  throw new Error(`Unauthorized`);
};

export const homeworkQueries = {
  getMany
};
