import { cache } from 'react';

import { getUserOverviewQuery } from '@/modules/shared/server';

import { getSessionUser } from './session-user';

/**
 * @cache React cache
 */
export const getMineOverviewLoader = cache(async () => {
  const sessionUser = await getSessionUser();

  return getUserOverviewQuery(sessionUser, sessionUser);
});
