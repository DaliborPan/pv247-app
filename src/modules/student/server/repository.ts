import { and, eq, inArray } from 'drizzle-orm';
import { cacheTag } from 'next/cache';

import { db } from '@/db';
import { type SessionUserType } from '@/modules/session-user/types';
import { users, type UserInsertType } from '@/db/schema/users';
import { studentsTag } from './tag';

export const updateUser = (
  id: string,
  values: Partial<Omit<UserInsertType, 'id'>>
) => db.update(users).set(values).where(eq(users.id, id));

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
    .where(and(inArray(users.id, studentIds), eq(users.role, 'student')));

export const getStudents = ({
  projectId,
  userId
}: {
  projectId?: string;
  userId?: string;
}) =>
  db.query.users.findMany({
    where: (table, { eq, and }) =>
      and(
        ...[
          ...(projectId ? [eq(table.projectId, projectId)] : []),
          ...(userId ? [eq(table.id, userId)] : [])
        ]
      )
  });

const getManyStudents = async () => {
  'use cache';
  cacheTag(studentsTag);

  return db.query.users.findMany({
    where: (table, { eq }) => eq(table.role, 'student')
  });
};

export const getProjectFormStudents = (
  sessionUser: SessionUserType,
  projectId: string | undefined
) =>
  db.query.users.findMany({
    where: (table, { eq, or, and, isNull, isNotNull, not }) =>
      and(
        or(
          ...[
            and(
              eq(table.role, 'student'),
              isNull(table.projectId),
              not(eq(table.id, sessionUser.id))
            ),
            ...(projectId ? [eq(table.projectId, projectId)] : [])
          ]
        ),
        isNotNull(table.github)
      )
  });

export const studentRepository = {
  getManyStudents
};
