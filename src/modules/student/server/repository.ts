import { and, eq, inArray } from 'drizzle-orm';

import { db, type User, users } from '@/db';

export const updateUser = (id: string, values: Partial<User>) =>
  db.update(users).set(values).where(eq(users.id, id));

export const assignProject = ({
  projectId,
  userIds
}: {
  projectId: string | null;
  userIds: string[];
}) =>
  db
    .update(users)
    .set({
      projectId
    })
    .where(and(inArray(users.id, userIds), eq(users.role, 'student')));

export const getStudentsByProjectId = (projectId: string) =>
  db.query.users.findMany({
    where: (users, { eq }) => eq(users.projectId, projectId)
  });

export const getStudentsWithHomework = () =>
  db.query.users.findMany({
    where: (table, { eq }) => eq(table.role, 'student'),
    with: {
      homeworksStudent: true
    }
  });
