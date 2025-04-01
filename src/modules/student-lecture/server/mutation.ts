import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import {
  createStudentLecture,
  deleteStudentLecture,
  getStudentLectures
} from './repository';

export const addStudentLectureMutation = async (
  sessionUser: SessionUserType,
  {
    lectureId,
    studentId
  }: {
    lectureId: string;
    studentId: string;
  }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to add attendance for other user`
    );
  }

  await createStudentLecture({ lectureId, studentId });
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
