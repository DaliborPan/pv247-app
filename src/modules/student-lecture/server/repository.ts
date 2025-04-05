import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import {
  type StudentLectureInsertType,
  studentLectures
} from '@/db/schema/studentLecture';

export const getStudentLectures = (studentId: string) =>
  db.query.studentLectures.findMany({
    where: (table, { eq }) => eq(table.studentId, studentId)
  });

export const deleteStudentLecture = ({
  lectureId,
  studentId
}: {
  lectureId: string;
  studentId: string;
}) =>
  db
    .delete(studentLectures)
    .where(
      and(
        eq(studentLectures.lectureId, lectureId),
        eq(studentLectures.studentId, studentId)
      )
    );

export const createStudentLecture = (
  values: Omit<StudentLectureInsertType, 'id'>
) => db.insert(studentLectures).values(values);
