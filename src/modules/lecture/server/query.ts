import { lectureRepository } from './repository';

const getOrdered = lectureRepository.getOrdered;

const getIsAvailable = lectureRepository.getIsAvailable;

const getIsHomeworkAvailable = lectureRepository.getIsHomeworkAvailable;

export const lectureQueries = {
  getOrdered,
  getIsAvailable,
  getIsHomeworkAvailable
};
