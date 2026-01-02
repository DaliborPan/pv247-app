import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type HomeworkInsertType, homeworks } from '@/db/schema/homeworks';
import { cacheTag } from 'next/cache';
import { getHomeworkTag } from './tag';

const getManyForStudent = async ({ userId }: { userId: string }) =>
  db.query.homeworks.findMany({
    where: (table, { eq }) => eq(table.studentId, userId)
  });

const getManyForLecture = async ({ lectureId }: { lectureId: string }) => {
  'use cache';
  cacheTag(getHomeworkTag({ lectureId }));

  return db.query.homeworks.findMany({
    where: (table, { eq }) => eq(table.lectureId, lectureId),
    with: {
      student: true
    }
  });
};

const getMany = async ({
  userId,
  lectureId
}: {
  userId?: string;
  lectureId?: string;
}) => {
  if (userId) {
    return getManyForStudent({ userId });
  }

  if (lectureId) {
    return getManyForLecture({ lectureId });
  }

  return db.query.homeworks.findMany();
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
