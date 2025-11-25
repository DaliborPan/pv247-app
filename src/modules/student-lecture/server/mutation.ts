import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import {
  createStudentLecture,
  deleteStudentLecture,
  studentLectureRepository
} from './repository';

export const processAcceptMineAttendanceMutation = async (
  sessionUser: SessionUserType,
  lectureId: string
) => {
  const existing = (
    await studentLectureRepository.getMany(sessionUser.id)
  ).find(studentLecture => studentLecture.lectureId === lectureId);

  if (existing) {
    return false;
  }

  await createStudentLecture({ lectureId, studentId: sessionUser.id });

  return true;
};

export const updateStudentLectureMutation = async (
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
    await deleteStudentLecture({ lectureId, studentId });

    return {
      status: 'deleted'
    } as const;
  }

  await createStudentLecture({ lectureId, studentId });

  return {
    status: 'created'
  } as const;
};
