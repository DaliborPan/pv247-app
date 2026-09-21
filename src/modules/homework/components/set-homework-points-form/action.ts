'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { homeworks } from '@/db/schema/homeworks';
import { authLectorServerAction } from '@/server/server-actions';

import { setHomeworkPointsFormSchema } from './schema';

export const updateHomeworkPointsAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input }) => {
    await db
      .update(homeworks)
      .set({ points: input.points })
      .where(
        and(
          eq(homeworks.lectureId, input.lecture.id),
          eq(homeworks.studentId, input.studentId)
        )
      );

    refresh();
  });

export const createHomeworkAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input }) => {
    await db.insert(homeworks).values({
      studentId: input.studentId,
      lectorId: input.lectorId,
      points: input.points,
      name: input.lecture.homeworkName,
      lectureId: input.lecture.id
    });

    refresh();
  });
