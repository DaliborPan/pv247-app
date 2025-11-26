import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectFormStudents, studentRepository } from './repository';
import { homeworkRepository } from '@/modules/homework/server/repository';

export const getProjectFormStudentComboboxQuery = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);

const getMany = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return studentRepository.getManyStudents();
};

const get = async (sessionUser: SessionUserType, studentId: string) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const [students, homeworks] = await Promise.all([
    studentRepository.getManyStudents(),
    homeworkRepository.getMany({ userId: studentId })
  ]);

  const student = students.find(student => student.id === studentId);

  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return {
    ...student,
    homeworksStudent: homeworks
  };
};

export const studentQueries = {
  getProjectFormStudentCombobox: getProjectFormStudentComboboxQuery,
  getMany,
  get
};
