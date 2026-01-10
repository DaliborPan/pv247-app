import { homeworkQueries } from '@/modules/homework/server';
import { getSession, getSessionUser } from '@/modules/session-user';

const getMine = async ({ lectureId }: { lectureId?: string } = {}) => {
  const sessionUser = await getSession();

  if (!sessionUser) {
    return [];
  }

  const homework = await homeworkQueries.getMany(sessionUser, {
    userId: sessionUser.id
  });

  if (lectureId) {
    return homework.filter(hw => hw.lectureId === lectureId);
  }

  return homework;
};

const getMany = async ({ userId }: { userId?: string }) => {
  const sessionUser = await getSessionUser();

  return homeworkQueries.getMany(sessionUser, { userId });
};

export const homeworkLoader = {
  getMine,
  getMany
};
