'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';

import { updateStudentLecture } from '../../server';

export const setStudentAttendanceAction = async ({
  studentId,
  lectureId
}: {
  studentId: string;
  lectureId: string;
}) => {
  const session = await auth();

  if (!session) {
    return {
      status: 'error',
      message: 'Unauthorized'
    } as const;
  }

  const result = await updateStudentLecture({ studentId, lectureId });

  revalidatePath(`/lector/student-detail/${studentId}`);

  return result;
};
