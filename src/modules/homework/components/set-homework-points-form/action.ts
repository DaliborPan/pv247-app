'use server';

import { revalidatePath } from 'next/cache';

import { authLectorServerAction } from '@/server/server-actions';

import {
  createHomeworkMutation,
  updateHomeworkPointsMutation
} from '../../server/mutation';

import { setHomeworkPointsFormSchema } from './schema';

const revalidate = ({ studentId }: { studentId: string }) => {
  revalidatePath('/lector/homeworks/[slug]', 'page');
  revalidatePath('/lector/students');
  revalidatePath(`/lector/student-detail/${studentId}`);
};

export const updateHomeworkPointsAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await updateHomeworkPointsMutation(ctx.sessionUserLector, {
      lectureId: input.lecture.id,
      studentId: input.studentId,
      points: input.points
    });

    revalidate({ studentId: input.studentId });
  });

export const createHomeworkAction = authLectorServerAction
  .input(setHomeworkPointsFormSchema)
  .handler(async ({ input, ctx }) => {
    await createHomeworkMutation(ctx.sessionUserLector, {
      ...input,
      name: input.lecture.homeworkName,
      lectureId: input.lecture.id
    });

    revalidate({ studentId: input.studentId });
  });
