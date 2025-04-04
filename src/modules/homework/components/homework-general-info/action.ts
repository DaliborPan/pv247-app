'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { getUserHomeworkQuery } from '../../server/query';

export const getHomeworkPointsAction = authServerAction
  .input(
    z.object({
      lectureId: z.string()
    })
  )
  .handler(({ input, ctx }) =>
    getUserHomeworkQuery(ctx.sessionUser, {
      lectureId: input.lectureId,
      userId: ctx.sessionUser.id
    })
  );
