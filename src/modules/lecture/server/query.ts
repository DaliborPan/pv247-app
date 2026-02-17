import { lectureRepository } from './repository';

const getIsAvailable = async (slug: string) => {
  const lectures = await lectureRepository.getMany();
  const slugLecture = lectures.find(lecture => lecture.slug === slug);

  if (!slugLecture) {
    throw new Error(`Lecture with slug ${slug} not found.`);
  }

  return slugLecture.isAvailable;
};

const getIsHomeworkAvailable = async (homeworkSlug: string) => {
  const lectures = await lectureRepository.getMany();
  const homeworkLecture = lectures.find(
    lecture => lecture.homeworkSlug === homeworkSlug
  );

  if (!homeworkLecture) {
    throw new Error(`Lecture with homework slug ${homeworkSlug} not found.`);
  }

  return homeworkLecture.isAvailable;
};

const getAvailable = async () => {
  const lectures = await lectureRepository.getMany();

  return lectures.filter(lecture => lecture.isAvailable);
};

/**
 * Get all lectures, that have homework.
 * Basically filter out last lecture that doesn't have homework.
 */
const getAllWithHomework = async () => {
  const lectures = await lectureRepository.getMany();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
};

export const lectureQueries = {
  getMany: lectureRepository.getMany,
  get: lectureRepository.get,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable,
  getAllWithHomework
};
