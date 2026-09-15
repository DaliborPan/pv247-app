import 'server-only';

import { cache } from 'react';
import { getSessionUser } from '@/modules/session-user';
import { homeworkRepositoryQueries } from './server/query';

const getManyForStudent = cache(async (studentId: string) => {
  const user = await getSessionUser();

  return homeworkRepositoryQueries.getManyForStudent(user, studentId);
});

export const homeworkRepositoryLoader = {
  getManyForStudent
};
