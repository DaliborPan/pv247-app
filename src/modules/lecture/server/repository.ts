import { db } from '@/db';
import { cacheLife, cacheTag } from 'next/cache';
import { lecturesTag } from './tag';
import { lectures } from '@/db/schema/lectures';
import { gte, lte } from 'drizzle-orm';

const getMany = async () => {
  'use cache';
  cacheTag(lecturesTag);
  cacheLife('max');

  return db.query.lectures.findMany({
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
    with: {
      homeworks: true
    }
  });
};

const get = async ({ homeworkSlug }: { homeworkSlug: string }) => {
  return getMany().then(lectures =>
    lectures.find(lecture => lecture.homeworkSlug === homeworkSlug)
  );
};

const updateIsAvailable = async () => {
  return db
    .update(lectures)
    .set({ isAvailable: true })
    .where(lte(lectures.availableFrom, new Date().toISOString()));
};

export const lectureRepository = {
  getMany,
  get,
  updateIsAvailable
};
