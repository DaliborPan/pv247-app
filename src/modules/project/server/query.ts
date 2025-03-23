import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectsCached } from './cache';

export const getProjectsQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`${sessionUser.id} cannot read projects`);
  }

  return getProjectsCached();
};

export const getProjectQuery = async (id: string) => {
  const projects = await getProjectsCached();

  return projects.find(project => project.id === id);
};

export type GetProjectQueryResult = Awaited<ReturnType<typeof getProjectQuery>>;
