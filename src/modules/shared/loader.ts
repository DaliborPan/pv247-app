import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type User } from '@/db';

import { getUserOverviewQuery } from './server';

export const getUserOverviewLoader = cache(async (user: User) => {
  const sessionUser = await getSessionUser();

  return getUserOverviewQuery(sessionUser, user);
});

export type GetUserOverviewLoaderResult = Awaited<
  ReturnType<typeof getUserOverviewLoader>
>;
