'use server';

import { authLectorServerAction } from '@/server/server-actions';

import { revalidateTag } from 'next/cache';
import { lecturesTag } from '../../server/tag';
import { lectureMutations } from '../../server/mutation';

export const revalidateLecturesAction = authLectorServerAction.handler(
  async ({ ctx }) => {
    await lectureMutations.updateIsAvalable(ctx.sessionUserLector);

    revalidateTag(lecturesTag, 'max');
  }
);
