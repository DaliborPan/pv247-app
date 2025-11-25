import { db } from '@/db';
import { cacheTag } from 'next/cache';
import { lecturesTag } from './tag';
import { checkIsAvailable } from '../utils/check-is-available';

const getOrdered = async () => {
  'use cache';
  cacheTag(lecturesTag);

  return db.query.lectures.findMany({
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
    with: {
      homeworks: true
    }
  });
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsAvailable = async (slug: string) => {
  'use cache';
  cacheTag(lecturesTag);

  const ordered = await getOrdered();
  const lecture = ordered.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  'use cache';
  cacheTag(lecturesTag);

  const ordered = await getOrdered();
  const lecture = ordered.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};

export const lectureRepository = {
  getOrdered,
  getIsAvailable,
  getIsHomeworkAvailable
};
