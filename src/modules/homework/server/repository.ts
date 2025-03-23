import { db } from '@/db';

export const getHomework = ({ userId }: { userId?: string } = {}) =>
  db.query.homeworks.findMany({
    where: (table, { eq }) => {
      if (userId) {
        return eq(table.studentId, userId);
      }

      return undefined;
    }
  });

export type GetHomeworksResult = Awaited<ReturnType<typeof getHomework>>;
