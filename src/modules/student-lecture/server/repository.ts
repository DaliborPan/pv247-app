import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import {
  type StudentLectureInsertType,
  studentLectures
} from '@/db/schema/studentLecture';
import { getStudentLecturesTag } from './tag';
import { cacheTag } from 'next/cache';

const getMany = async (studentId: string) => {
  'use cache';
  cacheTag(getStudentLecturesTag(studentId));

  return db.query.studentLectures.findMany({
    where: (table, { eq }) => eq(table.studentId, studentId)
  });
};

const deleteFn = ({
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

const create = (values: Omit<StudentLectureInsertType, 'id'>) =>
  db.insert(studentLectures).values(values);

export const studentLectureRepository = {
  getMany,
  create,
  delete: deleteFn
};
