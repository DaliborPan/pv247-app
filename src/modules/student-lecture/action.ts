'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { processAcceptMineAttendanceMutation } from './server/mutation';
import { studentLectureQueries } from './server/query';

export const getAttendancesAction = authServerAction
  .input(z.undefined())
  .handler(async ({ ctx }) =>
    studentLectureQueries.getMany(ctx.sessionUser, {
      userId: ctx.sessionUser.id
    })
  );

export const processAcceptMineAttendanceAction = authServerAction
  .input(z.object({ lectureId: z.string() }))
  .handler(async ({ input, ctx }) => {
    const updated = await processAcceptMineAttendanceMutation(
      ctx.sessionUser,
      input.lectureId
    );
  });
