import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type HomeworkInsertType, homeworks } from '@/db/schema/homeworks';

export const getMany = ({ userId }: { userId: string }) =>
  db.query.homeworks.findMany({
    where: (table, { eq }) => eq(table.studentId, userId)
  });

export const updateHomeworkPoints = (
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

export const createHomework = (values: Omit<HomeworkInsertType, 'id'>) =>
  db.insert(homeworks).values(values);

export const homeworkRepository = {
  getMany
};
