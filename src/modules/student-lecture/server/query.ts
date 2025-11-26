import { type SessionUserType } from '@/modules/session-user/types';
import { studentLectureRepository } from './repository';

export const getMany = async (
  sessionUser: SessionUserType,
  { userId }: { userId: string }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error('Unauthorized');
  }

  if (sessionUser.role === 'lector') {
    return [];
  }

  return studentLectureRepository.getMany(userId);
};

export const studentLectureQueries = {
  getMany
};
