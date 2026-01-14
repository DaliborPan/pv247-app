import { lectureQueries } from './server';

const getMany = lectureQueries.getMany;

const get = lectureQueries.get;

const getIsAvailable = lectureQueries.getIsAvailable;

const getIsHomeworkAvailable = lectureQueries.getIsHomeworkAvailable;

const getAvailable = lectureQueries.getAvailable;

/**
 * Get all lectures, that have homework.
 * Basically filter out last lecture that doesn't have homework.
 */
const getAllWithHomework = async () => {
  const lectures = await lectureQueries.getMany();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

export const lectureLoaders = {
  getMany,
  get,
  getAllWithHomework,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable
};
