'use server';

import { eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { authLectorServerAction } from '@/server/server-actions';

import { setProjectPointsFormSchema } from './schema';

export const setProjectPointsAction = authLectorServerAction
  .input(setProjectPointsFormSchema)
  .handler(async ({ input }) => {
    await db
      .update(projects)
      .set({
        status: input.status,
        comment: input.comment
      })
      .where(eq(projects.id, input.projectId));

    refresh();
  });
