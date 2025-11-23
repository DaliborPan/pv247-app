'use server';

import { authLectorServerAction } from '@/server/server-actions';

import { getOrderedLecturesCached } from '../../server';

export const revalidateLecturesAction = authLectorServerAction.handler(
  async () => {
    getOrderedLecturesCached.revalidate();
  }
);
