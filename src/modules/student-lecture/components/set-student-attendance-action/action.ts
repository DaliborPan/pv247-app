'use server';

import { z } from 'zod';

import { authLectorServerAction } from '@/server/server-actions';

import { studentLectureMutations } from '../../server/mutation';
import { updateTag } from 'next/cache';
import { getStudentLecturesTag } from '../../server/tag';

export const setStudentAttendanceAction = authLectorServerAction
  .input(
    z.object({
      studentId: z.string(),
      lectureId: z.string()
    })
  )
  .handler(async ({ input, ctx }) => {
    const result = await studentLectureMutations.update(
      ctx.sessionUserLector,
      input
    );

    updateTag(getStudentLecturesTag(input.studentId));

    return result;
  });
