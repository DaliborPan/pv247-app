import { lectureQueries } from './server';
import { checkIsAvailable } from './utils/check-is-available';

const getOrdered = lectureQueries.getOrdered;

export const getAvailableLecturesLoader = async () => {
  const lectures = await lectureQueries.getOrdered();

  return lectures.filter(checkIsAvailable);
};

/**
 * Get all lectures, that have homework. Basically filter out last lecture.
 */
const getAllWithHomework = async () => {
  const lectures = await lectureQueries.getOrdered();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

const getIsAvailable = async (slug: string) => {
  const lectures = await lectureQueries.getOrdered();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

const getIsHomeworkAvailable = async (homeworkSlug: string) => {
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
