'use server';

import { revalidateTag } from 'next/cache';

import { type Project } from '@/db';

import { PROJECTS_TAG, updateProject } from '../../server';

export const approveProjectAction = async ({
  project
}: {
  project: Project;
}) => {
  await updateProject(project.id, {
    status: project.status === 'pending' ? 'approved' : 'pending'
  });

  revalidateTag(PROJECTS_TAG);
};
