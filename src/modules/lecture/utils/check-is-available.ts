import { type LectureType } from '../schema';

export const checkIsAvailable = (lecture: LectureType) => {
  return new Date(lecture.availableFrom) < new Date();
};
