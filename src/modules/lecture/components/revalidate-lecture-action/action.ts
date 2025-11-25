'use server';

import { authLectorServerAction } from '@/server/server-actions';

import { lectureQueries } from '../../server';

export const revalidateLecturesAction = authLectorServerAction.handler(
  async () => {
    // TODO(pv247)
  }
);
