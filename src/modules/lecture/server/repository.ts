import { db } from '@/db';

export const getOrderedLectures = () =>
  db.query.lectures.findMany({
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
    with: {
      homeworks: true
    }
  });
