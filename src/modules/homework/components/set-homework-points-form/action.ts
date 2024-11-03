'use server';

import { revalidatePath } from 'next/cache';

import { createHomework, updateHomeworkPoints } from '../../server/mutation';

import { type SetHomeworkPointsFormSchema } from './schema';

const revalidate = ({ studentId }: { studentId: string }) => {
  revalidatePath('/lector/homeworks/[slug]', 'page');
  revalidatePath('/lector/students');
  revalidatePath(`/lector/student-detail/${studentId}`);
};

export const updateHomeworkPointsAction = async ({
  lecture,
  ...data
}: SetHomeworkPointsFormSchema) => {
  await updateHomeworkPoints({
    ...data,
    lectureId: lecture.id
  });

  revalidate({ studentId: data.studentId });
};

export const createHomeworkAction = async ({
  lecture,
  ...data
}: SetHomeworkPointsFormSchema) => {
  await createHomework({
    ...data,
    name: lecture.homeworkName,
    lectureId: lecture.id
  });

  revalidate({ studentId: data.studentId });
};
