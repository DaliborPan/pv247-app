'use server';

import { z } from 'zod';

import { authLectorServerAction } from '@/server/server-actions';

import { lectureLectorMutations } from '../../server/mutation';
import { refresh } from 'next/cache';

export const setLectureTeacherApprovalAction = authLectorServerAction
  .input(
    z.object({
      lectureId: z.string(),
      lectorId: z.string(),
      isApproved: z.boolean()
    })
  )
  .handler(async ({ ctx, input }) => {
    await lectureLectorMutations.setApproved(ctx.sessionUserLector, input);

    refresh();
  });
