'use server';

import { updateProjectPointsMutation } from '@/modules/project/server';
import { authLectorServerAction } from '@/server/server-actions';

import { setProjectPointsFormSchema } from './schema';

export const setProjectPointsAction = authLectorServerAction
  .input(setProjectPointsFormSchema)
  .handler(async ({ ctx, input }) => {
    await updateProjectPointsMutation(ctx.sessionUserLector, input.projectId, {
      points: input.points,
      comment: input.comment
    });
  });
