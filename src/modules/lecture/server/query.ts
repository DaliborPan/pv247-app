import { lectureRepository } from './repository';

const getMany = lectureRepository.getMany;

const get = lectureRepository.get;

const getIsAvailable = lectureRepository.getIsAvailable;

const getIsHomeworkAvailable = lectureRepository.getIsHomeworkAvailable;

const getAvailable = lectureRepository.getAvailable;

export const lectureQueries = {
  getMany,
  get,
  getIsAvailable,
  getIsHomeworkAvailable,
  getAvailable
};
