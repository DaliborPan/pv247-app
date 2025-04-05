import { type DefaultSession } from 'next-auth';

import { type UserRoleType, type UserType } from '@/modules/user/schema';

export type SessionUserType = DefaultSession['user'] & UserType;

export type SessionUserLectorType = DefaultSession['user'] &
  Omit<UserType, 'role'> & {
    role: Extract<UserRoleType, 'lector'>;
  };
