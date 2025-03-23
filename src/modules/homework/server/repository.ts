import { and } from 'drizzle-orm';

import { db } from '@/db';

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

export type GetHomeworksResult = Awaited<ReturnType<typeof getHomework>>;
