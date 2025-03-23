import { getSessionUser } from '@/modules/session-user/server';

import { getProjectsQuery } from './query';

export const getProjectsLoader = async () => {
  const sessionUser = await getSessionUser();

  return getProjectsQuery(sessionUser);
};

export type GetProjectsLoaderResult = Awaited<
  ReturnType<typeof getProjectsLoader>
>;
