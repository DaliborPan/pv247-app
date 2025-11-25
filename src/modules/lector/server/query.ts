import { type SessionUserType } from '@/modules/session-user/types';
import { studentRepository } from '@/modules/student/server';

import { getHomeworkReviewers } from './repository';

export const getNewStudentLectorIdQuery = async () => {
  const reviewerEmails = process.env.HOMEWORK_REVIEWER_EMAILS?.split(';') ?? [];
  const reviewers = await getHomeworkReviewers({ reviewerEmails });

  if (!reviewers.length) {
    throw new Error(`No reviewers found`);
  }

  return reviewers.reduce((acc, lector) => {
    if (lector.students.length < acc.students.length) {
      return lector;
    }

    return acc;
  }, reviewers[0]).id;
};

const getStudentsWithHomework = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return studentRepository.getWithHomework({ role: 'student' });
};

export const getStudentQuery = async (
  sessionUser: SessionUserType,
  studentId: string
) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const student = (
    await studentRepository.getWithHomework({ role: 'student' })
  ).find(student => student.id === studentId);

  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return student;
};

export const lectorQueries = {
  getStudentsWithHomework
};
