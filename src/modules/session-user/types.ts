import { type DefaultSession } from 'next-auth';

import { type User } from '@/db';

export type SessionUserType = DefaultSession['user'] & User;

export type SessionUserLectorType = DefaultSession['user'] &
  Omit<User, 'role'> & {
    role: 'lector';
  };
