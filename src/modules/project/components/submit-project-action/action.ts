'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { updateProjectStatusMutation } from '../../server';

export const submitProjectAction = authServerAction
  .input(z.object({ projectId: z.string() }))
  .handler(async ({ input, ctx }) => {
    await updateProjectStatusMutation(ctx.sessionUser, input.projectId, {
      status: 'submitted'
    });
  });
