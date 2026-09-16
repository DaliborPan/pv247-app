'use server';

import { and, eq } from 'drizzle-orm';
import { refresh } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { projects } from '@/db/schema/projects';
import { users } from '@/db/schema/users';
import { authServerAction } from '@/server/server-actions';

import { projectStatusSchema } from '../../schema';

export const approveProjectAction = authServerAction
  .input(
    z.object({
      projectId: z.string(),
      currentStatus: projectStatusSchema
    })
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.sessionUser.role !== 'lector') {
      const membership = await db.query.users.findFirst({
        columns: { id: true },
        where: and(
          eq(users.id, ctx.sessionUser.id),
          eq(users.projectId, input.projectId)
        )
      });

      if (!membership) {
        throw new Error(
          `User ${ctx.sessionUser.id} is not allowed to update project ${input.projectId}`
        );
      }
    }

    await db
      .update(projects)
      .set({
        status: input.currentStatus === 'CREATED' ? 'APPROVED' : 'CREATED'
      })
      .where(eq(projects.id, input.projectId));

    refresh();
  });
