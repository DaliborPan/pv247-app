import { eq } from 'drizzle-orm';

import { db, type User, users } from '@/db';

export const updateUser = (id: string, values: Partial<User>) =>
	db.update(users).set(values).where(eq(users.id, id));
