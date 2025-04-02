import { getSessionUser } from '@/modules/session-user';

import { getProjectFormStudentComboboxQuery } from './server';

/**
 * Loads students, that are not assigned to a project and are not the current user.
 *
 * Students, that are already assigned to the project are also included.
 */
export const getProjectFormStudentComboboxLoader = async (
  projectId: string | undefined
) => {
  const sessionUser = await getSessionUser();

  return getProjectFormStudentComboboxQuery(sessionUser, projectId);
};
