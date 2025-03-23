import { checkIsAvailable } from '../utils/check-is-available';

import { getOrderedLecturesQuery } from './query';

export const getOrderedLecturesLoader = getOrderedLecturesQuery;

export const getAvailableLecturesLoader = async () => {
  const lectures = await getOrderedLecturesQuery();

  return lectures.filter(checkIsAvailable);
};

/**
 * Get all lectures, that have homework
 * - basically filter out last lecture
 */
export const getLecturesWithHomeworkLoader = async () => {
  const lectures = await getOrderedLecturesQuery();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

export const getIsLectureAvailable = async (slug: string) => {
  const lectures = await getOrderedLecturesQuery();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  return !!lecture && checkIsAvailable(lecture);
};

export const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  const lectures = await getOrderedLecturesQuery();
  const lecture = lectures.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  return !!lecture && checkIsAvailable(lecture);
};
