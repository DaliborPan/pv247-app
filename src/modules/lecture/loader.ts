import { lectureQueries } from './server';

const getOrdered = lectureQueries.getOrdered;

const getIsAvailable = lectureQueries.getIsAvailable;

const getIsHomeworkAvailable = lectureQueries.getIsHomeworkAvailable;

const getAvailableLectures = lectureQueries.getAvailableLectures;

/**
 * Get all lectures, that have homework. Basically filter out last lecture.
 */
const getAllWithHomework = async () => {
  const lectures = await lectureQueries.getOrdered();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

export const lectureLoaders = {
  getOrdered,
  getAllWithHomework,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailableLectures
};
