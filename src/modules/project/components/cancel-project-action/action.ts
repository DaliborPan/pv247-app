'use server';

import { eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { user as users } from '@/db/schema/users/users';
import { authStudentServerAction } from '@/server/server-actions';

import { getStudentProject } from '../../queries';

export const cancelProjectAction = authStudentServerAction

  .handler(async ({ ctx }) => {
    const project = await getStudentProject({
      sessionUser: ctx.sessionUserStudent,
      studentId: ctx.sessionUserStudent.id
    });

    if (!project) {
      throw new Error(
        `User ${ctx.sessionUserStudent.id} does not have a project.`
      );
    }

    await db.transaction(async tx => {
      await tx
        .update(users)
        .set({ projectId: null })
        .where(eq(users.projectId, project.id));

      await tx.delete(projects).where(eq(projects.id, project.id));
    });

    refresh();
  });
