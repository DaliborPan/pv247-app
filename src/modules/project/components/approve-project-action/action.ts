'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { updateProjectStatusMutation } from '../../server';
import { projectStatusSchema } from '../../schema';
import { refresh } from 'next/cache';

export const approveProjectAction = authServerAction
  .input(
    z.object({
      projectId: z.string(),
      currentStatus: projectStatusSchema
    })
  )
  .handler(async ({ ctx, input }) => {
    await updateProjectStatusMutation(ctx.sessionUser, input.projectId, {
      status: input.currentStatus === 'CREATED' ? 'APPROVED' : 'CREATED'
    });

    refresh();
  });
