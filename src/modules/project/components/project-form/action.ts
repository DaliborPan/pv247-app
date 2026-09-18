'use server';

import { and, eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { user as users } from '@/db/schema/users/users';
import { authServerAction } from '@/server/server-actions';

import { projectFormSchema } from './schema';

export const createProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { students, ...input }, ctx }) => {
    const currentUser = await db.query.users.findFirst({
      columns: { projectId: true },
      where: eq(users.id, ctx.sessionUser.id)
    });

    if (
      !currentUser ||
      currentUser.projectId ||
      !students.includes(ctx.sessionUser.id)
    ) {
      throw new Error(
        `User ${ctx.sessionUser.id} is not allowed to create a project.`
      );
    }

    const [project] = await db
      .insert(projects)
      .values(input)
      .returning({ id: projects.id });

    await db
      .update(users)
      .set({ projectId: project.id })
      .where(and(inArray(users.id, students), eq(users.role, 'student')));

    revalidatePath('/project');
  });

export const updateProjectAction = authServerAction
  .input(projectFormSchema)
  .handler(async ({ input: { id, students, ...input }, ctx }) => {
    if (!id) {
      throw new Error('Project id is required');
    }

    const currentProjectStudents = await db.query.users.findMany({
      columns: { id: true },
      where: eq(users.projectId, id)
    });

    if (!currentProjectStudents.some(user => user.id === ctx.sessionUser.id)) {
      throw new Error(
        `User ${ctx.sessionUser.id} is not allowed to update project ${id}`
      );
    }

    await db.update(projects).set(input).where(eq(projects.id, id));

    await db
      .update(users)
      .set({ projectId: null })
      .where(
        and(
          inArray(
            users.id,
            currentProjectStudents.map(user => user.id)
          ),
          eq(users.role, 'student')
        )
      );

    await db
      .update(users)
      .set({ projectId: id })
      .where(and(inArray(users.id, students), eq(users.role, 'student')));

    revalidatePath('/project/edit');
  });
