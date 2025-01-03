'use server';

import { revalidatePath } from 'next/cache';

import { updateUser } from '../../server/mutation';

import { type EditProfileFormSchema } from './schema';

export const editProfileAction = async ({
  id,
  ...values
}: EditProfileFormSchema) => {
  await updateUser(id, values);

  revalidatePath('/profile');
};
