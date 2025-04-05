import { type LectureType } from '../schema';

export const checkIsAvailable = (lecture: LectureType) =>
  new Date(lecture.availableFrom) < new Date();
