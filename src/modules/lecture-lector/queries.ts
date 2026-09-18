import 'server-only';

import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user/session-user';

import {
  type LectureApprovedLectorType,
  type LectureLectorType
} from './types';

export const getLectorsForLecturesQuery = cache(
  async (): Promise<Record<string, LectureLectorType[]>> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error('Unauthorized');
    }

    const lectureLectors = await db.query.lectureLectors.findMany({
      columns: {
        id: true,
        lectureId: true,
        lectorId: true,
        status: true,
        isApproved: true
      },
      with: {
        lector: {
          columns: { name: true, firstName: true, lastName: true }
        }
      }
    });

    const lectorsByLecture: Record<string, LectureLectorType[]> = {};

    for (const { lectureId, ...lectureLector } of lectureLectors) {
      (lectorsByLecture[lectureId] ??= []).push(lectureLector);
    }

    return lectorsByLecture;
  }
);

export const getLectureApprovedLectorsQuery = cache(
  async (lectureId: string): Promise<LectureApprovedLectorType[]> =>
    db.query.lectureLectors.findMany({
      columns: { id: true },
      where: (lectureLectors, { and, eq }) =>
        and(
          eq(lectureLectors.lectureId, lectureId),
          eq(lectureLectors.isApproved, true)
        ),
      with: {
        lector: {
          columns: {
            name: true,
            firstName: true,
            lastName: true,
            image: true
          }
        }
      }
    })
);
