'use server';

import { lte } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

import { db } from '@/db';
import { lectures } from '@/db/schema/lectures/lectures';
import { authLectorServerAction } from '@/server/server-actions';

import { lecturesTag } from '../../tag';

export const revalidateLecturesAction = authLectorServerAction.handler(
  async () => {
    await db
      .update(lectures)
      .set({ isAvailable: true })
      .where(lte(lectures.availableFrom, new Date().toISOString()));

    revalidateTag(lecturesTag, 'max');
  }
);
