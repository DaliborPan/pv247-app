import { homeworkQueries } from '@/modules/homework/server';
import { getSession } from '@/modules/session-user';

const getMine = async () => {
  const sessionUser = await getSession();

  if (!sessionUser) {
    return [];
  }

  return homeworkQueries.getMany(sessionUser, { userId: sessionUser.id });
};

export const homeworkLoader = {
  getMine
};
