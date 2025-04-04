import { db } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';
import { getStudentsWithHomeworkCached } from '@/modules/student/server';

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

export const getStudentsWithHomeworkQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return getStudentsWithHomeworkCached();
};

export const getStudentQuery = async (
  sessionUser: SessionUserType,
  studentId: string
) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const student = (await getStudentsWithHomeworkCached()).find(
    student => student.id === studentId
  );

  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return student;
};
