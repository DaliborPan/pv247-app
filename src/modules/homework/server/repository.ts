import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { type HomeworkInsertType, homeworks } from '@/db/schema/homeworks';

export const getHomework = ({
  userId,
  lectureId
}: { userId?: string; lectureId?: string } = {}) =>
  db.query.homeworks.findMany({
    where: (table, { eq }) =>
      and(
        ...[
          ...(userId ? [eq(table.studentId, userId)] : []),
          ...(lectureId ? [eq(table.lectureId, lectureId)] : [])
        ]
      )
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
