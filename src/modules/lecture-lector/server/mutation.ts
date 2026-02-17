import type { SessionUserLectorType } from '@/modules/session-user/types';

import { lectureLectorRepository } from './repository';

export const signUp = async (
  sessionUserLector: SessionUserLectorType,
  lectureId: string
) => {
  const existingLectorLectures =
    await lectureLectorRepository.findByLectureId(lectureId);

  const isAlreadySignedUp = existingLectorLectures.some(
    lectorLecture => lectorLecture.lectorId === sessionUserLector.id
  );

  if (isAlreadySignedUp) {
    throw new Error(
      `Lector ${sessionUserLector.id} is already signed up for lecture ${lectureId}`
    );
  }

  if (existingLectorLectures.length >= 2) {
    throw new Error(`Lecture ${lectureId} has already 2 lectors`);
  }

  await lectureLectorRepository.create({
    lectureId,
    lectorId: sessionUserLector.id
  });
};

export const signOut = async (
  sessionUserLector: SessionUserLectorType,
  lectureId: string
) => {
  const existingLectorLectures =
    await lectureLectorRepository.findByLectureId(lectureId);

  const isSignedUp = existingLectorLectures.some(
    lectorLecture => lectorLecture.lectorId === sessionUserLector.id
  );

  if (!isSignedUp) {
    throw new Error(
      `Lector ${sessionUserLector.id} is not signed up for lecture ${lectureId}`
    );
  }

  await lectureLectorRepository.delete({
    lectureId,
    lectorId: sessionUserLector.id
  });
};

export const lectureLectorMutations = {
  signUp,
  signOut
};
