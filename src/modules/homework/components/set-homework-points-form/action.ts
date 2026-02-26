'use server';

import { authLectorServerAction } from '@/server/server-actions';

import { homeworkMutations } from '../../server/mutation';

import { setHomeworkPointsFormSchema } from './schema';
import { refresh } from 'next/cache';

export const updateHomeworkPointsAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await homeworkMutations.update(ctx.sessionUserLector, {
      lectureId: input.lecture.id,
      studentId: input.studentId,
      points: input.points
    });

    refresh();
  });

export const createHomeworkAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await homeworkMutations.create(ctx.sessionUserLector, {
      ...input,
      name: input.lecture.homeworkName,
      lectureId: input.lecture.id
    });

    refresh();
  });
