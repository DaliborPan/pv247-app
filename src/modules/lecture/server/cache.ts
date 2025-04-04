import { revalidateTag, unstable_cache } from 'next/cache';

import { getOrderedLectures } from './repository';

export const getOrderedLecturesCached = (() => {
  const tag = 'getOrderedLectures';

  const handler = () =>
    unstable_cache(getOrderedLectures, [tag], { tags: [tag] })();

  handler.revalidate = () => revalidateTag(tag);

  return handler;
})();
