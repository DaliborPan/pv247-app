import { and, eq } from 'drizzle-orm';

import { db, studentLectures } from '@/db';

export const getStudentLectures = async ({
  studentId
}: {
  studentId: string;
}) =>
  db.query.studentLectures.findMany({
    where: (table, { eq }) =>
      studentId ? eq(table.studentId, studentId) : undefined
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
