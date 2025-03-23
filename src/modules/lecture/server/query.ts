import { unstable_cache } from 'next/cache';

import { db, type HomeworkSlug, type LectureSlug } from '@/db';

import { checkIsAvailable } from '../utils/check-is-available';

import { getOrderedLectures } from './repository';

export const getOrderedLecturesQuery = getOrderedLectures;

/**
 * Get all lectures with homework (filter away last lecture)
 *
 * @cache using Next.js cache
 */
export const getLecturesWithHomework = async () => {
  const lectures = await getOrderedLectures();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

export const getIsLectureAvailableTag = (slug: LectureSlug) =>
  `is-lecture-available_${slug}`;

/**
 * Get is lecture available by slug
 *
 * @cache Next.js cache
 */
export const getIsLectureAvailable = (slug: LectureSlug) =>
  unstable_cache(
    async () => {
      const lecture = await db.query.lectures.findFirst({
        where: (table, { eq }) => eq(table.slug, slug)
      });

      return !!lecture && checkIsAvailable(lecture);
    },
    [getIsLectureAvailableTag(slug)],
    {
      tags: [getIsLectureAvailableTag(slug)]
    }
  )();

export const getIsHomeworkAvailableTag = (slug: HomeworkSlug) =>
  `is-homework-available_${slug}`;

/**
 * Get is homework available by slug
 *
 * @cache Next.js cache
 */
export const getIsHomeworkAvailable = (slug: HomeworkSlug) =>
  unstable_cache(
    async () => {
      const lecture = await db.query.lectures.findFirst({
        where: (table, { eq }) => eq(table.homeworkSlug, slug)
      });

      return !!lecture && checkIsAvailable(lecture);
    },
    [getIsHomeworkAvailableTag(slug)],
    {
      tags: [getIsHomeworkAvailableTag(slug)]
    }
  )();
