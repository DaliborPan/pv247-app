'use server';

import { authLectorServerAction } from '@/server/server-actions';
import { getStudentsWithHomeworkCached } from '@/modules/student/server';

import {
  createHomeworkMutation,
  updateHomeworkPointsMutation
} from '../../server/mutation';

import { setHomeworkPointsFormSchema } from './schema';

export const updateHomeworkPointsAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await updateHomeworkPointsMutation(ctx.sessionUserLector, {
      lectureId: input.lecture.id,
      studentId: input.studentId,
      points: input.points
    });

    getStudentsWithHomeworkCached.revalidate();
  });

export const createHomeworkAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await createHomeworkMutation(ctx.sessionUserLector, {
      ...input,
      name: input.lecture.homeworkName,
      lectureId: input.lecture.id
    });

    getStudentsWithHomeworkCached.revalidate();
  });
