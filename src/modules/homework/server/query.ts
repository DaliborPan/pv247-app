import { db } from '@/db';

/**
 * Get homework by userId and lectureId
 */
export const getUserHomework = async ({
  userId,
  lectureId
}: {
  userId: string;
  lectureId: string;
}) =>
  db.query.homeworks.findFirst({
    where: (table, { eq, and }) =>
      and(eq(table.lectureId, lectureId), eq(table.studentId, userId))
  });
