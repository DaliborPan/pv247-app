'use server';

import { revalidateTag } from 'next/cache';

import { authServerAction } from '@/server/server-actions';

import {
  createProjectMutation,
  PROJECTS_TAG,
  updateProjectMutation
} from '../../server';

import { projectFormSchema } from './schema';

export const createProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { students, ...input }, ctx }) => {
    await createProjectMutation(ctx.sessionUser, students, input);

    revalidateTag(PROJECTS_TAG);
  });

export const updateProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { id, students, ...input }, ctx }) => {
    if (!id) {
      throw new Error('Project id is required');
    }

    await updateProjectMutation(ctx.sessionUser, id, students, input);

    revalidateTag(PROJECTS_TAG);
  });
