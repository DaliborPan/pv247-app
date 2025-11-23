'use client';

import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { type SessionUserType } from '@/modules/session-user/types';

import { type auth } from './auth';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()]
});

export const { signIn, signOut } = authClient;

export const useSession = () => {
  const session = authClient.useSession();

  return {
    ...session,
    user: session.data?.user as SessionUserType | undefined
  };
};
