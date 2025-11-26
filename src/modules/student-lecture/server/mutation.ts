import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import { studentLectureRepository } from './repository';

export const createMine = async (
  sessionUser: SessionUserType,
  lectureId: string
) => {
  const existing = (
    await studentLectureRepository.getMany(sessionUser.id)
  ).find(studentLecture => studentLecture.lectureId === lectureId);

  if (existing) {
    return false;
  }

  await studentLectureRepository.create({
    lectureId,
    studentId: sessionUser.id
  });

  return true;
};

export const update = async (
  _sessionUserLector: SessionUserLectorType,
  {
    lectureId,
    studentId
  }: {
    lectureId: string;
    studentId: string;
  }
) => {
  const existing = (await studentLectureRepository.getMany(studentId)).find(
    studentLecture => studentLecture.lectureId === lectureId
  );

  if (existing) {
    await studentLectureRepository.delete({ lectureId, studentId });

    return {
      status: 'deleted'
    } as const;
  }

  await studentLectureRepository.create({ lectureId, studentId });

  return {
    status: 'created'
  } as const;
};

export const studentLectureMutations = {
  createMine,
  update
};
