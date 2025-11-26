import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type HomeworkInsertType, homeworks } from '@/db/schema/homeworks';
import { cacheTag } from 'next/cache';
import { getHomeworkTag } from './tag';

const getMany = async ({ userId }: { userId: string }) => {
  'use cache';
  cacheTag(getHomeworkTag(userId));

  return db.query.homeworks.findMany({
    where: (table, { eq }) => eq(table.studentId, userId)
  });
};

const update = (
  { lectureId, studentId }: { lectureId: string; studentId: string },
  { points }: Pick<HomeworkInsertType, 'points'>
) =>
  db
    .update(homeworks)
    .set({
      points
    })
    .where(
      and(
        eq(homeworks.lectureId, lectureId),
        eq(homeworks.studentId, studentId)
      )
    );

const create = (values: Omit<HomeworkInsertType, 'id'>) =>
  db.insert(homeworks).values(values);

export const homeworkRepository = {
  getMany,
  update,
  create
};
