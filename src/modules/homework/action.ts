'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { getUserHomeworkQuery } from './server';

export const getHomeworkPointsAction = authServerAction
  .input(
    z
      .object({
        lectureId: z.string()
      })
      .optional()
  )
  .handler(async ({ input, ctx }) =>
    getUserHomeworkQuery(ctx.sessionUser, {
      lectureId: input?.lectureId,
      userId: ctx.sessionUser.id
    })
  );
