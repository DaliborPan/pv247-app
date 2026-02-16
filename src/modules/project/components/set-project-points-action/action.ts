'use server';

import { updateProjectPointsMutation } from '@/modules/project/server';
import { authLectorServerAction } from '@/server/server-actions';

import { setProjectPointsFormSchema } from './schema';
import { refresh } from 'next/cache';

export const setProjectPointsAction = authLectorServerAction
  .input(setProjectPointsFormSchema)
  .handler(async ({ ctx, input }) => {
    await updateProjectPointsMutation(ctx.sessionUserLector, input.projectId, {
      status: input.status,
      comment: input.comment
    });

    refresh();
  });
