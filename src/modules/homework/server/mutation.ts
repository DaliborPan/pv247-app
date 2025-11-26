import { type SessionUserLectorType } from '@/modules/session-user/types';

import { homeworkRepository } from './repository';

const create = (
  _sessionUserLector: SessionUserLectorType,
  values: Parameters<typeof homeworkRepository.create>[0]
) => homeworkRepository.create(values);

const update = (
  _sessionUserLector: SessionUserLectorType,
  {
    studentId,
    lectureId,
    points
  }: { studentId: string; lectureId: string; points: number }
) => homeworkRepository.update({ studentId, lectureId }, { points });

export const homeworkMutations = {
  create,
  update
};
