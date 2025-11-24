import { lectureRepository } from './repository';

const getOrdered = lectureRepository.getOrdered;

export const lectureQueries = {
  getOrdered
};
