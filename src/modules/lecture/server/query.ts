import { lectureRepository } from './repository';

const getMany = lectureRepository.getMany;

const getIsAvailable = lectureRepository.getIsAvailable;

const getIsHomeworkAvailable = lectureRepository.getIsHomeworkAvailable;

const getAvailable = lectureRepository.getAvailable;

export const lectureQueries = {
  getMany,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable
};
