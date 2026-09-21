'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { user as users } from '@/db/schema/users/users';
import { authServerAction } from '@/server/server-actions';

import { profileFormSchema } from './schema';

export const onboardingFormAction = authServerAction
  .input(profileFormSchema)
  .handler(async ({ ctx, input: { firstName, lastName, github } }) => {
    await db
      .update(users)
      .set({ firstName, lastName, github })
      .where(eq(users.id, ctx.sessionUser.id));

    revalidatePath('/', 'layout');
  });

export const editProfileAction = authServerAction
  .input(profileFormSchema)
  .handler(async ({ ctx, input: { firstName, lastName, github } }) => {
    await db
      .update(users)
      .set({ firstName, lastName, github })
      .where(eq(users.id, ctx.sessionUser.id));

    revalidatePath('/profile');
  });
