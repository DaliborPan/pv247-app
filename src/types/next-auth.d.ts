/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { type AdapterUser } from 'next-auth/adapters';

import { type SessionUserType } from '@/modules/session-user/types';
import { type UserType } from '@/modules/user/schema';

declare module 'next-auth' {
  interface Session {
    user: SessionUserType;
  }

  interface User extends AdapterUser, UserType {}
}
