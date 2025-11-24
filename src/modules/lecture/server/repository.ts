import { db } from '@/db';

export const getOrdered = () =>
  db.query.lectures.findMany({
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
    with: {
      homeworks: true
    }
  });

export const lectureRepository = {
  getOrdered
};
