'use server';

import { revalidateTag } from 'next/cache';

import { authLectorServerAction } from '@/server/server-actions';

import { ORDERED_LECTURES_TAG } from '../../server';

export const revalidateLecturesAction = authLectorServerAction.handler(() => {
  revalidateTag(ORDERED_LECTURES_TAG);
});
