import { lectureQueries } from './server';

const getMany = () => lectureQueries.getMany();

const getIsAvailable = (slug: string) => lectureQueries.getIsAvailable(slug);

const getIsHomeworkAvailable = (homeworkSlug: string) =>
  lectureQueries.getIsHomeworkAvailable(homeworkSlug);

const getAvailable = () => lectureQueries.getAvailable();

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
  getAllWithHomework,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable
};
