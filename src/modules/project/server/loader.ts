import { revalidateTag, unstable_cache } from 'next/cache';

import { getSessionUser } from '@/modules/session-user/server';
import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectsQuery } from './query';

/**
 * Get all projects
 *
 * @cache Next.js cache
 */
export const getProjectsLoader = (() => {
  const getTag = (role: SessionUserType['role']) => `getProjectsLoader-${role}`;

  const handler = async () => {
    const sessionUser = await getSessionUser();
    const tags = [getTag(sessionUser.role)];

    return unstable_cache(
      async () => getProjectsQuery(sessionUser.role as never),
      tags,
      { tags }
    )();
  };

  handler.revalidate = () => revalidateTag(getTag('lector'));

  return handler;
})();

export type GetProjectsLoaderResult = Awaited<
  ReturnType<typeof getProjectsLoader>
>;
