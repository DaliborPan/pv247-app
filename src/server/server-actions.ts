import { createServerActionProcedure } from 'zsa';

import { getSessionUser } from '@/modules/session-user/server';

export const authServerAction = createServerActionProcedure()
  .handler(async () => {
    try {
      const sessionUser = await getSessionUser();

      return {
        sessionUser
      };
    } catch (err) {
      throw new Error('User not authenticated');
    }
  })
  .createServerAction();
