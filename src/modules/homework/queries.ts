import 'server-only';

import { cache } from 'react';

import { db } from '@/db';
import { getSession, getSessionUser } from '@/modules/session-user';

import { type HomeworkGradingStatusType, type HomeworkType } from './types';

export const getStudentHomeworksQuery = cache(
  async (studentId: string): Promise<HomeworkType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error('Unauthorized');
    }

    return db.query.homeworks.findMany({
      columns: { lectureId: true, points: true },
      where: (homeworks, { eq }) => eq(homeworks.studentId, studentId)
    });
  }
);

export const getMyHomeworksQuery = cache(
  async (lectureId?: string): Promise<HomeworkType[]> => {
    const sessionUser = await getSession();

    if (!sessionUser) {
      return [];
    }

    const homework = await getStudentHomeworksQuery(sessionUser.id);

    return lectureId
      ? homework.filter(record => record.lectureId === lectureId)
      : homework;
  }
);

export const getHomeworkGradingStatusQuery = cache(
  async (lectureId: string): Promise<HomeworkGradingStatusType> => {
    const homework = await db.query.homeworks.findFirst({
      columns: { id: true },
      where: (homeworks, { eq }) => eq(homeworks.lectureId, lectureId)
    });

    return { hasGradingStarted: homework !== undefined };
  }
);
