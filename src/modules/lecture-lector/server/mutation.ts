import type { SessionUserLectorType } from '@/modules/session-user/types';
import type { LectureLectorStatusType } from '../schema';

import { lectureLectorRepository } from './repository';

export const signUp = async (
  sessionUserLector: SessionUserLectorType,
  lectureId: string,
  status: LectureLectorStatusType
) => {
  const existingLectorLectures =
    await lectureLectorRepository.getByLectureId(lectureId);

  const isAlreadySignedUp = existingLectorLectures.some(
    lectorLecture => lectorLecture.lectorId === sessionUserLector.id
  );

  if (isAlreadySignedUp) {
    throw new Error(
      `Lector ${sessionUserLector.id} is already signed up for lecture ${lectureId}`
    );
  }

  await lectureLectorRepository.create({
    lectureId,
    lectorId: sessionUserLector.id,
    status,
    isApproved: false
  });
};

export const signOut = async (
  sessionUserLector: SessionUserLectorType,
  lectureId: string
) => {
  const existingLectorLectures =
    await lectureLectorRepository.getByLectureId(lectureId);

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

export const setApproved = async (
  _sessionUserLector: SessionUserLectorType,
  {
    lectureId,
    lectorId,
    isApproved
  }: {
    lectureId: string;
    lectorId: string;
    isApproved: boolean;
  }
) => {
  const existingLectorLectures =
    await lectureLectorRepository.getByLectureId(lectureId);

  const targetLectorLecture = existingLectorLectures.find(
    lectorLecture => lectorLecture.lectorId === lectorId
  );

  if (!targetLectorLecture) {
    throw new Error(
      `Lector ${lectorId} is not signed up for lecture ${lectureId}`
    );
  }

  if (isApproved) {
    const approvedLectorsCount = existingLectorLectures.filter(
      lectorLecture => lectorLecture.isApproved
    ).length;

    if (!targetLectorLecture.isApproved && approvedLectorsCount >= 2) {
      throw new Error(`Lecture ${lectureId} already has 2 approved lectors`);
    }
  }

  await lectureLectorRepository.updateIsApproved({
    lectureId,
    lectorId,
    isApproved
  });
};

export const lectureLectorMutations = {
  signUp,
  signOut,
  setApproved
};
