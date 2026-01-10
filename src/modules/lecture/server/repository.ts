import { db } from '@/db';
import { cacheLife, cacheTag } from 'next/cache';
import { lecturesTag } from './tag';
import { checkIsAvailable } from '../utils/check-is-available';

const getMany = async () => {
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
const getAvailable = async () => {
  'use cache';
  cacheLife('minutes');

  const lectures = await getMany();

  return lectures.filter(checkIsAvailable);
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsAvailable = async (slug: string) => {
  'use cache';
  cacheLife('minutes');

  const available = await getAvailable();

  return available.find(lecture => lecture.slug === slug);
};

/**
 * Caching separately due to comparing to new Date()
 */
const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  'use cache';
  cacheLife('minutes');

  const ordered = await getMany();
  const lecture = ordered.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};

export const lectureRepository = {
  getMany,
  getIsAvailable,
  getAvailable,
  getIsHomeworkAvailable
};
