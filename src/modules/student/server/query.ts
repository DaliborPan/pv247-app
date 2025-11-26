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

  return studentRepository.getManyWithHomework({ role: 'student' });
};

export const studentQueries = {
  getProjectFormStudentCombobox: getProjectFormStudentComboboxQuery,
  getManyWithHomework
};
