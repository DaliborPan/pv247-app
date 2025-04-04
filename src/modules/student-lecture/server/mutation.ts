import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import {
  createStudentLecture,
  deleteStudentLecture,
  getStudentLectures
} from './repository';

export const processAcceptMineAttendanceMutation = async (
  sessionUser: SessionUserType,
  lectureId: string
) => {
  const existing = (
    await getStudentLectures({ lectureId, studentId: sessionUser.id })
  ).at(0);

  if (existing) {
    return;
  }

  await createStudentLecture({ lectureId, studentId: sessionUser.id });
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
  const existingStudentLectures = await getStudentLectures({
    lectureId,
    studentId
  });

  if (existingStudentLectures.length) {
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
