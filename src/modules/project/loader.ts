import { getSessionUser } from '@/modules/session-user';

import { getProjectsQuery } from './server/query';

export const getProjectsLoader = async () => {
  const sessionUser = await getSessionUser();

  return getProjectsQuery(sessionUser);
};

export type GetProjectsLoaderResult = Awaited<
  ReturnType<typeof getProjectsLoader>
>;
