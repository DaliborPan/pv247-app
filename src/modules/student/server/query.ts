import { db } from '@/db';

/**
 * Get student by id
 */
export const getStudent = (id: string) =>
  db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id)
  });

export type GetStudent = Awaited<ReturnType<typeof getStudent>>;
