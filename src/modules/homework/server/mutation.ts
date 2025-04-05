import { type SessionUserLectorType } from '@/modules/session-user/types';

import { createHomework, updateHomeworkPoints } from './repository';

export type CreateHomeworkMutationValuesType = Parameters<
  typeof createHomework
>[0];

export const createHomeworkMutation = async (
  _sessionUserLector: SessionUserLectorType,
  values: CreateHomeworkMutationValuesType
) => {
  await createHomework(values);
};

export const updateHomeworkPointsMutation = async (
  _sessionUserLector: SessionUserLectorType,
  {
    studentId,
    lectureId,
    points
  }: { studentId: string; lectureId: string; points: number }
) => {
  await updateHomeworkPoints({ studentId, lectureId }, { points });
};
