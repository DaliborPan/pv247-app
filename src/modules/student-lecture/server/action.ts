'use server';

import { z } from 'zod';

import { authServerAction } from '@/server/server-actions';

import { getStudentLecturesQuery } from './query';

export const getAttendancesAction = authServerAction
  .input(z.undefined())
  .handler(async ({ ctx }) => getStudentLecturesQuery(ctx.sessionUser));
