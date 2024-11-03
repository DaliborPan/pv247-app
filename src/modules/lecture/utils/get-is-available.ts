import { type Lecture } from '@/db';

export const getIsAvailable = (lecture: Lecture) =>
  new Date(lecture.availableFrom) < new Date();
