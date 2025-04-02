import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';

import { getProjectQuery, getProjectsQuery } from './server';

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
export const getMineProjectLoader = cache(async () => {
  const sessionUser = await getSessionUser();
  const userProjectId = sessionUser.projectId;

  if (!userProjectId) {
    return null;
  }

  return getProjectQuery(sessionUser, userProjectId);
});

export type GetMineProjectLoaderResult = Awaited<
  ReturnType<typeof getMineProjectLoader>
>;
