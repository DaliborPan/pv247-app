import { type SessionUserType } from '@/modules/session-user/types';

import { getProjects } from './repository';

export const PROJECTS_TAG = 'projects';

export const getProjectsQuery = async (
  sessionUserRole: SessionUserType['role']
) => {
  if (sessionUserRole !== 'lector') {
    throw new Error(`${sessionUserRole} cannot read projects`);
  }

  return getProjects();
};

/**
 * Get project by id
 *
 * @cache using Next.js cache
 */
export const getProject = async (id: string) => {
  const projects = await getProjects();

  return projects.find(project => project.id === id);
};

export type GetProjectResult = Awaited<ReturnType<typeof getProject>>;
