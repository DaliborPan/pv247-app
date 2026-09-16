import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users, type UserInsertType } from '@/db/schema/users';

export const updateUser = (
  id: string,
  values: Partial<Omit<UserInsertType, 'id'>>
) => db.update(users).set(values).where(eq(users.id, id));

const getManyStudents = async () => {
  return db.query.users.findMany({
    where: (table, { eq }) => eq(table.role, 'student')
  });
};

const getManyStudentsWithHomework = ({ lectureId }: { lectureId: string }) =>
  db.query.users.findMany({
    where: (table, { eq }) => eq(table.role, 'student'),
    with: {
      homeworksStudent: {
        where: (table, { eq }) => eq(table.lectureId, lectureId)
      }
    }
  });

const listStudents = () =>
  db.query.users.findMany({
    where: (table, { eq }) => eq(table.role, 'student'),
    with: {
      homeworksStudent: true,
      project: true,
      studentLectures: true
    }
  });

export const studentRepository = {
  getManyStudents,
  getManyStudentsWithHomework,
  listStudents
};
