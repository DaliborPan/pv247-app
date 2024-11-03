import { unstable_cache } from 'next/cache';
import React from 'react';

import { db, type HomeworkSlug, type LectureSlug } from '@/db';

import { getIsAvailable } from '../utils';

export const ORDERED_LECTURES_TAG = 'ordered-lectures';

/**
 * Get all ordered lectures
 *
 * @cache Next.js cache
 */
export const getOrderedLectures = unstable_cache(
  async () => {
    const lectures = await db.query.lectures.findMany({
      orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
      with: {
        homeworks: true
      }
    });

    return lectures;
  },
  [ORDERED_LECTURES_TAG],
  {
    tags: [ORDERED_LECTURES_TAG]
  }
);

/**
 * Get all lectures with homework (filter away last lecture)
 *
 * @cache using Next.js cache
 */
export const getLecturesWithHomework = async () => {
  const lectures = await getOrderedLectures();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

/**
 * Get all available lectures
 *
 * @cache React cache
 */
export const getAvailableLectures = React.cache(async () => {
  const lectures = await getOrderedLectures();

  return lectures.filter(getIsAvailable);
});

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

      return !!lecture && getIsAvailable(lecture);
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

      return !!lecture && getIsAvailable(lecture);
    },
    [getIsHomeworkAvailableTag(slug)],
    {
      tags: [getIsHomeworkAvailableTag(slug)]
    }
  )();
