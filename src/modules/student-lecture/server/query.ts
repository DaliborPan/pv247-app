import { type SessionUserType } from '@/modules/session-user/types';

import { getStudentLectures } from './repository';

export const getStudentLecturesQuery = async (
  sessionUser: SessionUserType,
  lectureId?: string
) =>
  // TODO(pv) - auth?
  getStudentLectures({ lectureId, studentId: sessionUser.id });
