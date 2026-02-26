import { and, eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import {
  type LectureLectorInsertType,
  lectureLectors
} from '@/db/schema/lecture-lector';

const getMany = () =>
  db.query.lectureLectors.findMany({
    with: {
      lector: true
    }
  });

const getByLectureId = (lectureId: string) =>
  db.query.lectureLectors.findMany({
    where: (table, { eq }) => eq(table.lectureId, lectureId),
    with: {
      lector: true
    }
  });

const create = (values: Omit<LectureLectorInsertType, 'id'>) =>
  db.insert(lectureLectors).values(values);

const updateIsApproved = ({
  lectureId,
  lectorId,
  isApproved
}: {
  lectureId: string;
  lectorId: string;
  isApproved: boolean;
}) =>
  db
    .update(lectureLectors)
    .set({ isApproved })
    .where(
      and(
        eq(lectureLectors.lectureId, lectureId),
        eq(lectureLectors.lectorId, lectorId)
      )
    );

const deleteFn = ({
  lectureId,
  lectorId
}: {
  lectureId: string;
  lectorId: string;
}) =>
  db
    .delete(lectureLectors)
    .where(
      and(
        eq(lectureLectors.lectureId, lectureId),
        eq(lectureLectors.lectorId, lectorId)
      )
    );

export const lectureLectorRepository = {
  getMany,
  create,
  updateIsApproved,
  delete: deleteFn,
  getByLectureId
};
