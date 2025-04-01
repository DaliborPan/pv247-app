'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';
import { projectStatusSchema } from '@/db/schema/projects';

import { updateProjectStatusMutation } from '../../server';

export const approveProjectAction = authServerAction
  .input(
    z.object({
      projectId: z.string(),
      currentStatus: projectStatusSchema
    })
  )
  .handler(async ({ ctx, input }) => {
    await updateProjectStatusMutation(ctx.sessionUser, input.projectId, {
      status: input.currentStatus === 'pending' ? 'approved' : 'pending'
    });
  });
