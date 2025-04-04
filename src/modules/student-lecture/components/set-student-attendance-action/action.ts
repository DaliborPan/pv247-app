'use server';

import { z } from 'zod';

import { authLectorServerAction } from '@/server/server-actions';

import {
  getStudentLecturesCached,
  updateStudentLectureMutation
} from '../../server';

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

    getStudentLecturesCached.revalidate(input.studentId);

    return result;
  });
