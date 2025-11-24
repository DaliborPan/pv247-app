import { db } from '@/db';
import { cacheTag } from 'next/cache';
import { lecturesTag } from './tag';

export const getOrdered = async () => {
  'use cache';
  cacheTag(lecturesTag);

  return db.query.lectures.findMany({
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
    with: {
      homeworks: true
    }
  });
};

export const lectureRepository = {
  getOrdered
};
