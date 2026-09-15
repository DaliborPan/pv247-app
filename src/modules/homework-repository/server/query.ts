import 'server-only';

import { type SessionUserType } from '@/modules/session-user/types';
import { homeworkRepositoryRepository } from './repository';

export const getStudentHomeworkRepositories = (
  user: SessionUserType,
  studentId: string
) => {
  if (user.role !== 'lector' && user.id !== studentId) {
    throw new Error('Unauthorized');
  }

  return homeworkRepositoryRepository.getManyForStudent(studentId);
};
