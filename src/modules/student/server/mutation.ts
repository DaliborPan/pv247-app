import { type SessionUserType } from '@/modules/session-user/types';
import { type UserType } from '@/modules/user/schema';

import { updateUser } from './repository';

export const updateUserPersonalInfoMutation = (
  sessionUser: SessionUserType,
  updatedUserId: string,
  values: Pick<UserType, 'firstName' | 'lastName' | 'github'>
) => {
  if (sessionUser.id !== updatedUserId) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to update user ${updatedUserId}`
    );
  }

  return updateUser(updatedUserId, values);
};
