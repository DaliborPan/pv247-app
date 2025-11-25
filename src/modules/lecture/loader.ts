import { cacheLife } from 'next/cache';
import { lectureQueries } from './server';
import { checkIsAvailable } from './utils/check-is-available';

const getOrdered = lectureQueries.getOrdered;

/**
 * Get all lectures, that have homework. Basically filter out last lecture.
 */
const getAllWithHomework = async () => {
  const lectures = await lectureQueries.getOrdered();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

const getIsAvailable = async (slug: string) => {
  'use cache';
  cacheLife('hours');

  const lectures = await lectureQueries.getOrdered();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  'use cache';
  cacheLife('hours');

  const lectures = await lectureQueries.getOrdered();
  const lecture = lectures.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};

export const lectureLoaders = {
  getOrdered,
  getAllWithHomework,
  getIsAvailable,
  getIsHomeworkAvailable
};
