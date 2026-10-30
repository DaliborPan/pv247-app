'use server';

import { eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { authStudentServerAction } from '@/server/server-actions';

import { getStudentProject } from '../../queries';
import { updateProjectRepositoryFormSchema } from './schema';

export const updateProjectRepositoryAction = authStudentServerAction
  .input(updateProjectRepositoryFormSchema)
  .handler(async ({ input, ctx }) => {
    const project = await getStudentProject({
      sessionUser: ctx.sessionUserStudent,
      studentId: ctx.sessionUserStudent.id
    });

    if (!project) {
      throw new Error(
        `User ${ctx.sessionUserStudent.id} does not have a project.`
      );
    }

    if (project.assignment === null) {
      throw new Error('Use the project edit page to update your own project.');
    }

    await db
      .update(projects)
      .set({ github: input.github, updatedAt: new Date().toISOString() })
      .where(eq(projects.id, project.id));

    refresh();
  });
