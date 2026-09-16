'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { lectureLectors } from '@/db/schema/lecture-lector';
import { authLectorServerAction } from '@/server/server-actions';

import { lectureLectorStatusSchema } from '../../schema';

export const signUpLectureAction = authLectorServerAction
  .input(
    z.object({
      lectureId: z.string(),
      status: lectureLectorStatusSchema
    })
  )
  .handler(async ({ ctx, input }) => {
    const { lectureId, status } = input;
    const lectorId = ctx.sessionUserLector.id;
    const [existingLectorLecture] = await db
      .select({ lectorId: lectureLectors.lectorId })
      .from(lectureLectors)
      .where(
        and(
          eq(lectureLectors.lectureId, lectureId),
          eq(lectureLectors.lectorId, lectorId)
        )
      )
      .limit(1);

    if (existingLectorLecture) {
      throw new Error(
        `Lector ${lectorId} is already signed up for lecture ${lectureId}`
      );
    }

    await db.insert(lectureLectors).values({
      lectureId,
      lectorId,
      status,
      isApproved: false
    });

    refresh();
  });
