'use server';

import { type Project } from '@/db';

import { updateProject } from '../../server';

export const approveProjectAction = async ({
  project
}: {
  project: Project;
}) => {
  await updateProject(project.id, {
    status: project.status === 'pending' ? 'approved' : 'pending'
  });

  // getProjectsLoader.revalidate();
};
