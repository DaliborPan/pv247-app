import { lectureLectorRepository } from './repository';

const getMany = lectureLectorRepository.getMany;
const getByLectureId = lectureLectorRepository.getByLectureId;

export const lectureLectorQueries = {
  getMany,
  getByLectureId
};
