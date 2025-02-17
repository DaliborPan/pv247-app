'use server';

import { revalidatePath } from 'next/cache';

import { updateUser } from '../../server';

import { type OnboardingFormSchema } from './schema';

export const onboardingFormAction = async ({
  id,
  ...values
}: OnboardingFormSchema) => {
  await updateUser(id, values);

  revalidatePath('/', 'layout');
};
