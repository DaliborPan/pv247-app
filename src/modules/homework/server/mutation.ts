import { type HomeworkInsert } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';

import { createHomework, updateHomeworkPoints } from './repository';

export const createHomeworkMutation = async (
  sessionUser: SessionUserType,
  data: HomeworkInsert
) => {
  if (sessionUser.role !== 'lector') {
    throw new Error('Unauthorized');
  }

  await createHomework(data);
};

export const updateHomeworkPointsMutation = async (
  sessionUser: SessionUserType,
  params: { studentId: string; lectureId: string; points: number }
) => {
  if (sessionUser.role !== 'lector') {
    throw new Error('Unauthorized');
  }

  await updateHomeworkPoints(params);
};
