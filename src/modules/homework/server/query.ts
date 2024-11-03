import { db } from '@/db';

/**
 * Get all homeworks by userId
 */
export const getUserHomeworks = (userId: string) =>
  db.query.homeworks.findMany({
    where: (table, { eq }) => eq(table.studentId, userId)
  });

export type GetUserHomeworksResult = Awaited<
  ReturnType<typeof getUserHomeworks>
>;

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
