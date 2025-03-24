import { and, eq } from 'drizzle-orm';

import { db, studentLectures } from '@/db';

export const getStudentLectures = async ({
  lectureId,
  studentId
}: {
  lectureId?: string;
  studentId?: string;
}) =>
  db.query.studentLectures.findMany({
    where: (table, { eq, and }) =>
      and(
        ...[
          ...(lectureId ? [eq(table.lectureId, lectureId)] : []),
          ...(studentId ? [eq(table.studentId, studentId)] : [])
        ]
      )
  });

export const deleteStudentLecture = async ({
  lectureId,
  studentId
}: {
  lectureId: string;
  studentId: string;
}) => {
  await db
    .delete(studentLectures)
    .where(
      and(
        eq(studentLectures.lectureId, lectureId),
        eq(studentLectures.studentId, studentId)
      )
    );
};

export const createStudentLecture = async ({
  lectureId,
  studentId
}: {
  lectureId: string;
  studentId: string;
}) => {
  await db.insert(studentLectures).values({
    lectureId,
    studentId
  });
};
