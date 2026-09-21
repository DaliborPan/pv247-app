import 'server-only';

import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user/session-user';

import { type HomeworkRepositoryType } from './types';

export const getStudentHomeworkRepositoriesQuery = cache(
  async (studentId: string): Promise<HomeworkRepositoryType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error('Unauthorized');
    }

    return db.query.homeworkRepositories.findMany({
      columns: { lectureId: true, repositoryUrl: true, status: true },
      where: (homeworkRepositories, { eq }) =>
        eq(homeworkRepositories.studentId, studentId)
    });
  }
);
