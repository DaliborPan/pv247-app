import { eq, inArray } from 'drizzle-orm';

import { db, type User, users } from '@/db';

export const updateUser = (id: string, values: Partial<User>) =>
  db.update(users).set(values).where(eq(users.id, id));

export const assignProject = ({
  projectId,
  studentIds
}: {
  projectId: string | null;
  studentIds: string[];
}) =>
  db
    .update(users)
    .set({
      projectId
    })
    .where(inArray(users.id, studentIds))
    .execute();
