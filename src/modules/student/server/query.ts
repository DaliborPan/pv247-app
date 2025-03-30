import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectFormStudents } from './repository';

export const getProjectFormStudentComboboxQuery = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);
