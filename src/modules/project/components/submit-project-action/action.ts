'use server';

import { eq } from 'drizzle-orm';

import { db, type Project, projects } from '@/db';

export const submitProjectAction = async ({
  project
}: {
  project: Project;
}) => {
  await db
    .update(projects)
    .set({
      status: 'submitted'
    })
    .where(eq(projects.id, project.id));

  // revalidateTag(PROJECTS_TAG);
};
