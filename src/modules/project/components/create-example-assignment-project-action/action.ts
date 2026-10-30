'use server';

import { refresh } from 'next/cache';

import { projectAssignments } from '@/modules/project-example/assignments';
import { createProject } from '@/modules/project/mutations';
import { authStudentServerAction } from '@/server/server-actions';

import { createExampleAssignmentProjectActionSchema } from './schema';

export const createExampleAssignmentProjectAction = authStudentServerAction
  .input(createExampleAssignmentProjectActionSchema)
  .handler(async ({ input, ctx }) => {
    const assignment = projectAssignments.find(
      assignment => assignment.slug === input.assignment
    )!;

    await createProject(ctx.sessionUserStudent.id, input.teamMemberIds, {
      assignment: assignment.slug,
      name: assignment.title,
      shortDescription: assignment.description
    });

    refresh();
  });
