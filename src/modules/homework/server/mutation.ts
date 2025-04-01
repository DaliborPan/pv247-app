import { type HomeworkInsert } from '@/db';
import { type SessionUserLectorType } from '@/modules/session-user/types';

import { createHomework, updateHomeworkPoints } from './repository';

export const createHomeworkMutation = async (
  _sessionUserLector: SessionUserLectorType,
  data: HomeworkInsert
) => {
  await createHomework(data);
};

export const updateHomeworkPointsMutation = async (
  _sessionUserLector: SessionUserLectorType,
  params: { studentId: string; lectureId: string; points: number }
) => {
  await updateHomeworkPoints(params);
};
