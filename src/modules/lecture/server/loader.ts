import { unstable_cache } from 'next/cache';

import { checkIsAvailable } from '../utils/check-is-available';

import { getOrderedLecturesQuery } from './query';

export const ORDERED_LECTURES_TAG = 'ordered-lectures';

/**
 * Get all ordered lectures
 *
 * @cache Next.js cache
 */
export const getOrderedLecturesLoader = unstable_cache(
  () => getOrderedLecturesQuery(),
  [ORDERED_LECTURES_TAG],
  {
    tags: [ORDERED_LECTURES_TAG]
  }
);

/**
 * Get all available lectures
 *
 * @cache using Next.js cache
 */
export const getAvailableLecturesLoader = async () => {
  const lectures = await getOrderedLecturesLoader();

  return lectures.filter(checkIsAvailable);
};
