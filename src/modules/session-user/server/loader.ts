import { cache } from 'react';

import { getUserOverviewQuery } from '@/modules/shared/server';
import { getProjectQuery } from '@/modules/project/server';

import { getSessionUser } from './session-user';

/**
 * @cache React cache
 */
export const getMineOverviewLoader = cache(async () => {
  const sessionUser = await getSessionUser();

  return getUserOverviewQuery(sessionUser, sessionUser);
});

/**
 * @cache React cache
 */
export const getMineProjectLoader = cache(async () => {
  const sessionUser = await getSessionUser();
  const userProjectId = sessionUser.projectId;

  if (!userProjectId) {
    return undefined;
  }

  return getProjectQuery(sessionUser, userProjectId);
});
