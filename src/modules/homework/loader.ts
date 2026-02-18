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

const getGradingStatus = async (lectureId: string) => {
  const hasGradingStarted = await homeworkQueries.hasGradingStarted(lectureId);

  return { hasGradingStarted };
};

const getGradingStatusForLectures = async (lectureIds: string[]) => {
  const results = await Promise.all(
    lectureIds.map(async lectureId =>
      homeworkQueries.hasGradingStarted(lectureId)
    )
  );

  return Object.fromEntries(
    lectureIds.map((lectureId, index) => [lectureId, results[index] ?? false])
  );
};

export const homeworkLoader = {
  getMine,
  getMany,
  getGradingStatus,
  getGradingStatusForLectures
};
