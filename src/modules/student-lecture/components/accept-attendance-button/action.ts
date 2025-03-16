'use server';

import { revalidatePath } from 'next/cache';

import { getLecture } from '@/modules/lecture/server';

import { addStudentLecture } from '../../server';

export const acceptAttendanceAction = async ({
  studentId,
  lectureId
}: {
  studentId: string;
  lectureId: string;
}) => {
  const lecture = await getLecture(lectureId);

  if (!lecture) {
    throw new Error('Lecture not found');
  }

  await addStudentLecture({ studentId, lectureId });

  revalidatePath('/accept-attendance/[lectureId]');
};
