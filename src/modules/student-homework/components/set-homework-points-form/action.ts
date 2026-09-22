'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { studentHomeworks } from '@/db/schema/student-homework';
import { authLectorServerAction } from '@/server/server-actions';

import { setHomeworkPointsFormSchema } from './schema';

export const setHomeworkPointsAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    const updated = await db
      .update(studentHomeworks)
      .set({
        points: input.points,
        gradedBy: ctx.sessionUserLector.id,
        gradedAt: new Date()
      })
      .where(
        and(
          eq(studentHomeworks.lectureId, input.lectureId),
          eq(studentHomeworks.studentId, input.studentId),
          eq(studentHomeworks.status, 'ready')
        )
      )
      .returning({ id: studentHomeworks.id });

    if (updated.length === 0) {
      throw new Error(
        'A ready homework repository is required before grading.'
      );
    }

    refresh();
  });
