'use server';

import { authLectorServerAction } from '@/server/server-actions';

import { getOrderedLecturesLoader } from '../../server';

export const revalidateLecturesAction = authLectorServerAction.handler(() => {
  getOrderedLecturesLoader.revalidate();
});
