'use server';

import { revalidatePath } from 'next/cache';

import { authServerAction } from '@/server/server-actions';

import { updateUserPersonalInfoMutation } from '../../server';

import { editProfileFormSchema } from './schema';

export const editProfileAction = authServerAction
  .input(editProfileFormSchema)
  .handler(async ({ ctx, input }) => {
    await updateUserPersonalInfoMutation(
      ctx.sessionUser,
      ctx.sessionUser.id,
      input
    );

    revalidatePath('/profile');
  });
