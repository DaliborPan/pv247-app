'use server';

import { auth } from '@/auth';

import { getUserHomework } from '../../server/query';

export const getHomeworkPointsAction = async (lectureId: string) => {
  const session = await auth();

  if (!session) {
    return {
      status: 'error',
      message: 'Unauthorized'
    } as const;
  }

  const userHomework = await getUserHomework({
    lectureId,
    userId: session.user.id
  });

  if (!userHomework) {
    return {
      status: 'pending',
      points: 0
    } as const;
  }

  return {
    status: 'scored',
    points: userHomework.points
  } as const;
};
