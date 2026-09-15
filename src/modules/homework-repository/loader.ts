import 'server-only';

import { cache } from 'react';
import { getSessionUser } from '@/modules/session-user';
import { getStudentHomeworkRepositories as getStudentRepositories } from './server/query';

export const getStudentHomeworkRepositories = cache(
  async (studentId: string) => {
    const user = await getSessionUser();
    return getStudentRepositories(user, studentId);
  }
);
