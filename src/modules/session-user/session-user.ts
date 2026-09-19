import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';

import { auth } from '@/auth/auth';

import { type UserRoleType } from './schema';
import { tryCatch } from '@/lib/try-catch';

/**
 * Get the current session user.
 * Must be called from authenticated pages/components only!
 */
export const getSessionUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error(
      'getSessionUser must be called from authenticated pages/components only!'
    );
  }

  return session.user as Omit<typeof session.user, 'role'> & {
    role: UserRoleType;
  };
});

/**
 * Get the current session user. If there is no user,
 * return null.
 */
export const getSession = cache(async () => {
  const [user, error] = await tryCatch(getSessionUser());

  if (error) {
    return null;
  }

  return user;
});
