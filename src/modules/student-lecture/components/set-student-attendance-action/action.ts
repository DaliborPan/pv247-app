'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authLectorServerAction } from '@/server/server-actions';

import { updateStudentLectureMutation } from '../../server';

export const setStudentAttendanceAction = authLectorServerAction
  .input(
    z.object({
      studentId: z.string(),
      lectureId: z.string()
    })
  )
  .handler(async ({ input, ctx }) => {
    const result = await updateStudentLectureMutation(
      ctx.sessionUserLector,
      input
    );

    revalidatePath(`/lector/student-detail/${input.studentId}`);

    return result;
  });
