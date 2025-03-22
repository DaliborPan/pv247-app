'use server';

import { revalidatePath } from 'next/cache';

import { authServerAction } from '@/server/server-actions';

import { studentMutations } from '../../server/mutation';

import { editProfileFormSchema } from './schema';

export const editProfileAction = authServerAction
  .input(editProfileFormSchema)
  .handler(async ({ input: { id, ...input }, ctx }) => {
    await studentMutations.updateUserPersonalInfo(ctx.sessionUser, id, input);

    revalidatePath('/profile');
  });
