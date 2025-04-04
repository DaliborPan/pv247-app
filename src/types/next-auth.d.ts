/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { type AdapterUser } from 'next-auth/adapters';

import { type User as DbUser } from '@/db/';
import { type SessionUserType } from '@/modules/session-user/types';

declare module 'next-auth' {
  interface Session {
    user: SessionUserType;
  }

  interface User extends AdapterUser, DbUser {}
}
