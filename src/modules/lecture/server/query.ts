import { lectureRepository } from './repository';

const getOrdered = lectureRepository.getOrdered;

const getIsAvailable = lectureRepository.getIsAvailable;

const getIsHomeworkAvailable = lectureRepository.getIsHomeworkAvailable;

const getAvailableLectures = lectureRepository.getAvailableLectures;

export const lectureQueries = {
  getOrdered,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailableLectures
};
