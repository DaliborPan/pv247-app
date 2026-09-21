'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { lectureLectors } from '@/db/schema/lecture-lector';
import { authLectorServerAction } from '@/server/server-actions';

export const setLectureTeacherApprovalAction = authLectorServerAction
  .input(
    z.object({
      lectureId: z.string(),
      lectorId: z.string(),
      isApproved: z.boolean()
    })
  )
  .handler(async ({ input }) => {
    const { lectureId, lectorId, isApproved } = input;
    const existingLectorLectures = await db
      .select({
        lectorId: lectureLectors.lectorId,
        isApproved: lectureLectors.isApproved
      })
      .from(lectureLectors)
      .where(eq(lectureLectors.lectureId, lectureId));

    const targetLectorLecture = existingLectorLectures.find(
      lectorLecture => lectorLecture.lectorId === lectorId
    );

    if (!targetLectorLecture) {
      throw new Error(
        `Lector ${lectorId} is not signed up for lecture ${lectureId}`
      );
    }

    if (isApproved) {
      const approvedLectorsCount = existingLectorLectures.filter(
        lectorLecture => lectorLecture.isApproved
      ).length;

      if (!targetLectorLecture.isApproved && approvedLectorsCount >= 2) {
        throw new Error(`Lecture ${lectureId} already has 2 approved lectors`);
      }
    }

    await db
      .update(lectureLectors)
      .set({ isApproved })
      .where(
        and(
          eq(lectureLectors.lectureId, lectureId),
          eq(lectureLectors.lectorId, lectorId)
        )
      );

    refresh();
  });
