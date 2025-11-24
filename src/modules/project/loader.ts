import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';

import { getProjectsQuery, projectQueries } from './server';

export const getProjectsLoader = async () => {
  const sessionUser = await getSessionUser();

  return getProjectsQuery(sessionUser);
};

export type GetProjectsLoaderResult = Awaited<
  ReturnType<typeof getProjectsLoader>
>;

/**
 * @cache React cache
 */
const getMine = cache(async () => {
  const sessionUser = await getSessionUser();
  const userProjectId = sessionUser.projectId;

  if (!userProjectId) {
    return null;
  }

  return projectQueries.get(sessionUser, userProjectId);
});

export const projectLoaders = {
  getMine
};
