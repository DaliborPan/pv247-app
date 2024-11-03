'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

import { db, type Project, projects } from '@/db';
import { PROJECTS_TAG } from '@/modules/project/server';

import { type SetProjectPointsFormSchema } from './schema';

export const confirmProjectAction = async ({
  project
}: {
  project: Project;
}) => {
  await db
    .update(projects)
    .set({
      status: project.status === 'pending' ? 'approved' : 'pending'
    })
    .where(eq(projects.id, project.id));

  revalidateTag(PROJECTS_TAG);
};

export const setProjectPointsAction = async (
  data: SetProjectPointsFormSchema
) => {
  await db
    .update(projects)
    .set({
      ...data
    })
    .where(eq(projects.id, data.projectId));

  revalidateTag(PROJECTS_TAG);
};
