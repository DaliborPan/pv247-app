'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { getStudentLecturesQuery } from './server/query';
import { getStudentLecturesCached } from './server/cache';
import { processAcceptMineAttendanceMutation } from './server/mutation';

export const getAttendancesAction = authServerAction
  .input(z.undefined())
  .handler(async ({ ctx }) =>
    getStudentLecturesQuery(ctx.sessionUser, { userId: ctx.sessionUser.id })
  );

export const processAcceptMineAttendanceAction = authServerAction
  .input(z.object({ lectureId: z.string() }))
  .handler(async ({ input, ctx }) => {
    const updated = await processAcceptMineAttendanceMutation(
      ctx.sessionUser,
      input.lectureId
    );

    if (updated) {
      getStudentLecturesCached.revalidate(ctx.sessionUser.id);
    }
  });
