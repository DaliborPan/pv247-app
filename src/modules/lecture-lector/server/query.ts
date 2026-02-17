import { lectureLectorRepository } from './repository';
import { SessionUserType } from '@/modules/session-user/types';

const getMany = async ({ sessionUser }: { sessionUser: SessionUserType }) => {
  if (sessionUser.role !== 'lector') {
    throw new Error('Unauthorized');
  }

  return lectureLectorRepository.getMany();
};

export const lectureLectorQueries = {
  getMany
};
