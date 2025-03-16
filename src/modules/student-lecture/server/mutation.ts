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
