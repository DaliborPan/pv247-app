import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type UserType } from '@/modules/user/schema';

import { getProjectFormStudentComboboxQuery, studentQueries } from './server';

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

const getOverview = async (user: UserType) => {
  const sessionUser = await getSessionUser();

  return studentQueries.getOverview(sessionUser, user);
};

const getMineOverview = cache(async () => {
  const sessionUser = await getSessionUser();

  return studentQueries.getOverview(sessionUser, sessionUser);
});

export const studentLoaders = {
  getMineOverview,
  getOverview
};
