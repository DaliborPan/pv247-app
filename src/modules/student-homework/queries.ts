import 'server-only';
import { and, eq, isNotNull } from 'drizzle-orm';
import { cache } from 'react';

import { db } from '@/db';
import {
  getSession,
  getSessionUser
} from '@/modules/session-user/session-user';

import {
  type StudentHomeworkGradingStatusType,
  type StudentHomeworkType
} from './types';

export const studentHomeworkSelection = {
  lectureId: true,
  repositoryUrl: true,
  status: true,
  points: true
} as const;

export const getStudentHomeworksQuery = cache(
  async (studentId: string): Promise<StudentHomeworkType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error('Unauthorized');
    }

    return await db.query.studentHomeworks.findMany({
      columns: studentHomeworkSelection,
      where: (studentHomeworks, { eq }) =>
        eq(studentHomeworks.studentId, studentId)
    });
  }
);

export const getMyHomeworksQuery = cache(
  async (lectureId?: string): Promise<StudentHomeworkType[]> => {
    const sessionUser = await getSession();

    if (!sessionUser) return [];

    const studentHomeworks = await getStudentHomeworksQuery(sessionUser.id);

    return lectureId
      ? studentHomeworks.filter(record => record.lectureId === lectureId)
      : studentHomeworks;
  }
);

export const getHomeworkGradingStatusQuery = cache(
  async (lectureId: string): Promise<StudentHomeworkGradingStatusType> => {
    const studentHomework = await db.query.studentHomeworks.findFirst({
      columns: { id: true },
      where: studentHomeworks =>
        and(
          eq(studentHomeworks.lectureId, lectureId),
          isNotNull(studentHomeworks.points)
        )
    });

    return { hasGradingStarted: studentHomework !== undefined };
  }
);
