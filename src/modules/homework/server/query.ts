import { type SessionUserType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

const getMany = async (
  sessionUser: SessionUserType,
  { userId }: { userId?: string }
) => {
  if (userId) {
    if (sessionUser.role === 'lector' || userId === sessionUser.id) {
      return homeworkRepository.getMany({ userId });
    }

    throw new Error(`Unauthorized`);
  }

  if (sessionUser.role === 'lector') {
    return homeworkRepository.getMany();
  }

  throw new Error(`Unauthorized`);
};

export const homeworkQueries = {
  getMany
};
