import { type SessionUserLectorType } from '@/modules/session-user/types';
import { lectureRepository } from './repository';

const updateIsAvalable = async (_sessionUserLector: SessionUserLectorType) => {
  await lectureRepository.updateIsAvailable();
};

export const lectureMutations = {
  updateIsAvalable
};
