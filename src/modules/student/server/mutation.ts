import { type User } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';

import { updateUser } from './repository';

export const updateUserPersonalInfoMutation = (
  sessionUser: SessionUserType,
  updatedUserId: string,
  values: Pick<User, 'firstName' | 'lastName' | 'github'>
) => {
  if (sessionUser.id !== updatedUserId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to update user ${updatedUserId}`
    );
  }

  return updateUser(updatedUserId, values);
};
