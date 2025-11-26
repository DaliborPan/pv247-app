import { getSessionUser } from '@/modules/session-user';

import { studentLectureQueries } from './server';

export const getMany = async ({ userId }: { userId: string }) => {
  const sessionUser = await getSessionUser();

  return studentLectureQueries.getMany(sessionUser, { userId });
};

export const studentLectureLoaders = {
  getMany
};
