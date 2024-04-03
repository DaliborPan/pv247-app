'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db, users } from '@/db';

import { type EditProfileFormSchema } from './schema';

export const editProfileAction = async ({
	id,
	...values
}: EditProfileFormSchema) => {
	await db.update(users).set(values).where(eq(users.id, id));

	revalidatePath('/profile');
};
