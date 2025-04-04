'use server';

import { authServerAction } from '@/server/server-actions';

import { createProjectMutation, updateProjectMutation } from '../../server';

import { projectFormSchema } from './schema';

export const createProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { students, ...input }, ctx }) => {
    await createProjectMutation(ctx.sessionUser, students, input);
  });

export const updateProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { id, students, ...input }, ctx }) => {
    if (!id) {
      throw new Error('Project id is required');
    }

    await updateProjectMutation(ctx.sessionUser, id, students, input);
  });
