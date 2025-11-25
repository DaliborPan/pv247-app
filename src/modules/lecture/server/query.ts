import { lectureRepository } from './repository';

const getOrdered = lectureRepository.getOrdered;

const getIsAvailable = lectureRepository.getIsAvailable;

const getIsHomeworkAvailable = lectureRepository.getIsHomeworkAvailable;

const getAvailable = lectureRepository.getAvailable;

export const lectureQueries = {
  getOrdered,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable
};
