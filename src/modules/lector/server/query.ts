import { db } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';
import { getStudentsWithHomework } from '@/modules/student/server';

import { getLectorStudents } from './repository';

/**
 * When new student is created, assign it to the lector
 * with the least amount of students.
 */
export const getNewStudentLectorId = async () => {
  const lectors = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.role, 'lector'),
    with: {
      students: true
    }
  });

  if (!lectors.length) {
    throw new Error('No lectors found in the database');
  }

  const reviewers = lectors.filter(
    lector =>
      lector.email === 'pantlik.dalibor@seznam.cz' ||
      lector.email === 'samueltuka0@gmail.com'
  );

  return reviewers.reduce((acc, lector) => {
    if (lector.students.length < acc.students.length) {
      return lector;
    }

    return acc;
  }, lectors[0]).id;
};

/**
 * As a logged in lector, get all students that are assigned to me.
 */
export const getMineStudentsQuery = async (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const user = await getLectorStudents({ lectorId: sessionUser.id });

  if (!user) {
    throw new Error(`Lector ${sessionUser.id} not found`);
  }

  return user.students;
};

export type GetMineStudentsResult = Awaited<
  ReturnType<typeof getMineStudentsQuery>
>;

export const getStudentsWithHomeworkQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return getStudentsWithHomework();
};
