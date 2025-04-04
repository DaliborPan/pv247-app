import { cache } from 'react';

import { auth } from '@/auth';

/**
 * Get the current session user.
 * Must be called from authenticated pages/components only!
 *
 * @cache React cache
 */
export const getSessionUser = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error(
      'getSessionUser must be called from authenticated pages/components only!'
    );
  }

  return session.user;
});
