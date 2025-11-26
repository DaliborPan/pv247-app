'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { studentLectureQueries } from './server/query';

export const getAttendancesAction = authServerAction
  .input(z.undefined())
  .handler(async ({ ctx }) =>
    studentLectureQueries.getMany(ctx.sessionUser, {
      userId: ctx.sessionUser.id
    })
  );
