'use server';

import { revalidatePath } from 'next/cache';

import { authServerAction } from '@/server/server-actions';

import { updateUserPersonalInfoMutation } from '../../server';

import { onboardingFormSchema } from './schema';

export const onboardingFormAction = authServerAction
  .input(onboardingFormSchema)
  .handler(async ({ ctx, input: { firstName, lastName, github } }) => {
    await updateUserPersonalInfoMutation(ctx.sessionUser, ctx.sessionUser.id, {
      firstName,
      lastName,
      github
    });

    revalidatePath('/', 'layout');
  });
