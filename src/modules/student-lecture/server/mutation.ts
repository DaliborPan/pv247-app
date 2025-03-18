import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { studentLectures } from '@/db/schema/studentLecture';

export const addStudentLecture = async ({
  lectureId,
  studentId
}: {
  lectureId: string;
  studentId: string;
}) =>
  db.insert(studentLectures).values({
    lectureId,
    studentId
  });

export const updateStudentLecture = async ({
  lectureId,
  studentId
}: {
  lectureId: string;
  studentId: string;
}) => {
  const existing = await db.query.studentLectures.findFirst({
    where: and(
      eq(studentLectures.lectureId, lectureId),
      eq(studentLectures.studentId, studentId)
    )
  });

  if (existing) {
    await db
      .delete(studentLectures)
      .where(
        and(
          eq(studentLectures.lectureId, lectureId),
          eq(studentLectures.studentId, studentId)
        )
      );

    return {
      status: 'deleted'
    } as const;
  }

  await addStudentLecture({ lectureId, studentId });

  return {
    status: 'created'
  } as const;
};
