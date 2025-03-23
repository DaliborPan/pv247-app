import { getMineStudentsQuery } from '@/modules/lector/server';

import { getSessionUser } from './session-user';

export const getMineStudentsLoader = async () => {
  const sessionUser = await getSessionUser();

  return getMineStudentsQuery(sessionUser);
};
