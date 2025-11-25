import { db } from '@/db';
import { cacheLife, cacheTag } from 'next/cache';
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

const getAvailableLectures = async () => {
  'use cache';
  cacheLife('minutes');

  const lectures = await getOrdered();

  return lectures.filter(checkIsAvailable);
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsAvailable = async (slug: string) => {
  'use cache';
  cacheLife('minutes');

  const ordered = await getOrdered();
  const lecture = ordered.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  'use cache';
  cacheLife('minutes');

  const ordered = await getOrdered();
  const lecture = ordered.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};

export const lectureRepository = {
  getOrdered,
  getIsAvailable,
  getAvailableLectures,
  getIsHomeworkAvailable
};
