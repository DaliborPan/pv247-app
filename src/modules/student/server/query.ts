import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectFormStudents, studentRepository } from './repository';

export const getProjectFormStudentComboboxQuery = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);

const getManyWithHomework = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return studentRepository.getManyStudentsWithHomework();
};

const get = async (sessionUser: SessionUserType, studentId: string) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  // It's okay to get user from cache, we don't need to get it fresh from db.
  const student = (await studentRepository.getManyStudentsWithHomework()).find(
    student => student.id === studentId
  );

  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return student;
};

export const studentQueries = {
  getProjectFormStudentCombobox: getProjectFormStudentComboboxQuery,
  getManyWithHomework,
  get
};
