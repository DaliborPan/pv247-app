import { type Lecture } from '@/db';

export const checkIsAvailable = (lecture: Lecture) =>
  new Date(lecture.availableFrom) < new Date();
