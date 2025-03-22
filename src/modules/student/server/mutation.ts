import { inArray } from 'drizzle-orm';

import { db, type User, users } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';

import { updateUser } from './repository';

const updateUserPersonalInfo = (
  _sessionUser: SessionUserType,
  updatedUserId: string,
  values: Pick<User, 'firstName' | 'lastName' | 'github'>
) => updateUser(updatedUserId, values);

export const assignProject = ({
  projectId,
  studentIds
}: {
  projectId: string | null;
  studentIds: string[];
}) =>
  db
    .update(users)
    .set({
      projectId
    })
    .where(inArray(users.id, studentIds))
    .execute();

export const studentMutations = {
  updateUserPersonalInfo
};
