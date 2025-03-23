import { revalidateTag, unstable_cache } from 'next/cache';

import { checkIsAvailable } from '../utils/check-is-available';

import { getOrderedLecturesQuery } from './query';

export const getOrderedLecturesLoaderTag = 'ordered-lectures';

/**
 * Get all ordered lectures
 *
 * @cache Next.js cache
 */
export const getOrderedLecturesLoader = (() => {
  const tag = 'getOrderedLecturesLoader';

  const handler = () =>
    unstable_cache(() => getOrderedLecturesQuery(), [], {
      tags: [tag]
    })();

  handler.revalidate = () => revalidateTag(tag);

  return handler;
})();

/**
 * Get all available lectures
 *
 * @cache using Next.js cache
 */
export const getAvailableLecturesLoader = async () => {
  const lectures = await getOrderedLecturesLoader();

  return lectures.filter(checkIsAvailable);
};

/**
 * Get all lectures, that have homework
 * - basically filter out last lecture
 *
 * @cache using Next.js cache
 */
export const getLecturesWithHomeworkLoader = async () => {
  const lectures = await getOrderedLecturesLoader();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

/**
 * Get lecture by slug and check if it's available
 *
 * @cache using Next.js cache
 */
export const getIsLectureAvailable = async (slug: string) => {
  const lectures = await getOrderedLecturesLoader();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

/**
 * Get lecture by homrworkSlug and check if it's available
 *
 * @cache using Next.js cache
 */
export const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  const lectures = await getLecturesWithHomeworkLoader();
  const lecture = lectures.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};
