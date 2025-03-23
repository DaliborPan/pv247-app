import { cache } from 'react';

import { getUserOverviewQuery } from '@/modules/shared/server';
import { getProjectQuery } from '@/modules/project/server';

import { getSessionUser } from './session-user';

/**
 * Get mine project
 *
 * @cache React cache
 */
export const getMineProject = cache(async () => {
  const user = await getSessionUser();
  const userProjectId = user.projectId;

  if (!userProjectId) {
    return undefined;
  }

  return getProjectQuery(userProjectId);
});

export type GetMineProjectResult = Awaited<ReturnType<typeof getMineProject>>;

/**
 * Get mine overview
 *
 * @cache React cache
 */
export const getMineOverview = cache(async () => {
  const sessionUser = await getSessionUser();

  return getUserOverviewQuery(sessionUser, sessionUser);
});
