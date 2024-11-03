'use server';

import { revalidateTag } from 'next/cache';

import { type Project } from '@/db';

import { updateProject } from '../../server/mutation';
import { PROJECTS_TAG } from '../../server/query';

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
