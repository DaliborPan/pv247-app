'use server';

import { auth } from '@/auth';

import { getStudentLectures } from './query';

export const getAttendancesAction = async ({
  studentId
}: {
  studentId: string;
}) => {
  const session = await auth();

  if (!session) {
    return {
      status: 'error',
      message: 'Unauthorized'
    } as const;
  }

  const attendances = await getStudentLectures({ studentId });

  return {
    status: 'success',
    attendances
  } as const;
};
