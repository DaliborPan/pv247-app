'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { updateStudentLectureMutation } from '../../server';

export const setStudentAttendanceAction = authServerAction
  .input(
    z.object({
      studentId: z.string(),
      lectureId: z.string()
    })
  )
  .handler(async ({ input, ctx }) => {
    const result = await updateStudentLectureMutation(ctx.sessionUser, input);

    revalidatePath(`/lector/student-detail/${input.studentId}`);

    return result;
  });
