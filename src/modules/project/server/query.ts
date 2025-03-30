import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectsCached } from './cache';

export const getProjectsQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`${sessionUser.id} cannot read projects`);
  }

  return getProjectsCached();
};

export const getProjectQuery = async (
  sessionUser: SessionUserType,
  id: string
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== id) {
    throw new Error(`${sessionUser.id} cannot read project ${id}`);
  }

  const projects = await getProjectsCached();

  return projects.find(project => project.id === id);
};

export type GetProjectQueryResult = Awaited<ReturnType<typeof getProjectQuery>>;
