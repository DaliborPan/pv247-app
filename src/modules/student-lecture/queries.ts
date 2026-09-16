import 'server-only';

import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user';

import { type StudentLectureType } from './types';

export const getStudentLecturesQuery = cache(
  async (studentId: string): Promise<StudentLectureType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error('Unauthorized');
    }

    return db.query.studentLectures.findMany({
      columns: { lectureId: true },
      where: (studentLectures, { eq }) =>
        eq(studentLectures.studentId, studentId)
    });
  }
);
