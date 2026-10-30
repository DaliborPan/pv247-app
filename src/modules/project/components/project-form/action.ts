'use server';

import { eq } from 'drizzle-orm';
import { refresh } from 'next/cache';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { createProject } from '@/modules/project/mutations';
import { authStudentServerAction } from '@/server/server-actions';

import { getStudentProject } from '../../queries';
import { createProjectSchema, updateProjectSchema } from './schema';

export const createProjectAction = authStudentServerAction
  .input(createProjectSchema)
  .handler(async ({ input: { teamMemberIds, ...input }, ctx }) => {
    await createProject(ctx.sessionUserStudent.id, teamMemberIds, {
      ...input,
      assignment: null,
      github: input.github ?? null
    });

    refresh();
  });

export const updateProjectAction = authStudentServerAction
  .input(updateProjectSchema)
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

    if (project.assignment !== null) {
      throw new Error(
        'Only the GitHub repository can be changed for an assigned project.'
      );
    }

    await db
      .update(projects)
      .set({
        ...input,
        github: input.github ?? null,
        updatedAt: new Date().toISOString()
      })
      .where(eq(projects.id, project.id));

    refresh();
  });
