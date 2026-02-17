'use server';

import { z } from 'zod';

import { authLectorServerAction } from '@/server/server-actions';

import { lectureLectorMutations } from '../../server/mutation';
import { refresh } from 'next/cache';

export const signUpLectureAction = authLectorServerAction
  .input(z.object({ lectureId: z.string() }))
  .handler(async ({ ctx, input }) => {
    await lectureLectorMutations.signUp(ctx.sessionUserLector, input.lectureId);

    refresh();
  });
