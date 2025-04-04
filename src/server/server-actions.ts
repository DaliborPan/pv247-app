import { createServerActionProcedure } from 'zsa';

import { getSessionUser } from '@/modules/session-user';

const authServerProcedure = createServerActionProcedure().handler(async () => {
  try {
    const sessionUser = await getSessionUser();

    return {
      sessionUser
    };
  } catch (err) {
    throw new Error('User not authenticated');
  }
});

export const authServerAction = authServerProcedure.createServerAction();

export const authLectorServerAction = createServerActionProcedure(
  authServerProcedure
)
  .handler(({ ctx }) => {
    if (ctx.sessionUser.role !== 'lector') {
      throw new Error('User not authorized');
    }

    return {
      sessionUserLector: {
        ...ctx.sessionUser,
        role: 'lector' as const
      }
    };
  })
  .createServerAction();
