import { cache } from 'react';
import { headers } from 'next/headers';

import { auth } from '@/auth';

import { type UserRoleType } from '../user/schema';

/**
 * Get the current session user.
 * Must be called from authenticated pages/components only!
 *
 * @cache React cache
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
