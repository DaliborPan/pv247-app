import { revalidateTag, unstable_cache } from 'next/cache';

import { getStudentsWithHomework } from './repository';

export const getStudentsWithHomeworkCached = (() => {
  const tag = `getStudentsWithHomework`;

  const handler = () =>
    unstable_cache(
      () => {
        console.log(`[CACHE_MISS]: ${tag}`);

        return getStudentsWithHomework();
      },
      [tag],
      {
        tags: [tag]
      }
    )();

  handler.revalidate = () => revalidateTag(tag);

  return handler;
})();
