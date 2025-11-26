import { getSessionUser } from '@/modules/session-user';

import { getStudentQuery } from './server';

const getStudent = async (studentId: Promise<string>) => {
  const sessionUser = await getSessionUser();

  return getStudentQuery(sessionUser, await studentId);
};

export const lectorLoaders = {
  getStudent
};
