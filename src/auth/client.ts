'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { type UserRoleType } from '@/modules/user/schema';

import { type auth } from './auth';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
});

export const { signIn, signOut } = authClient;

export const useSession = () => {
  const session = authClient.useSession();

  return {
    ...session,
    user: session.data?.user as
      | (Omit<(typeof auth.$Infer.Session)['user'], 'role'> & {
          role: UserRoleType;
        })
      | undefined
  };
};
