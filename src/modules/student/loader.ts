import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { type UserType } from '@/modules/user/schema';

import {
  getProjectFormStudentComboboxQuery,
  getStudentOverviewQuery
} from './server';

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

export const getStudentOverviewLoader = async (user: UserType) => {
  const sessionUser = await getSessionUser();

  return getStudentOverviewQuery(sessionUser, user);
};

export type GetStudentOverviewLoaderResult = Awaited<
  ReturnType<typeof getStudentOverviewLoader>
>;

export const getMineOverviewLoader = cache(async () => {
  const sessionUser = await getSessionUser();

  return getStudentOverviewQuery(sessionUser, sessionUser);
});
