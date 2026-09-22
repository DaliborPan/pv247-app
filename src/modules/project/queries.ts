import 'server-only';
import { cache } from 'react';

import { db } from '@/db';
import { user as users } from '@/db/schema/users/users';
import { getSessionUser } from '@/modules/session-user/session-user';

import { type ProjectStudentOptionType, type ProjectType } from './types';

const projectSelection = {
  columns: {
    id: true,
    name: true,
    description: true,
    shortDescription: true,
    github: true,
    comment: true,
    status: true,
    updatedAt: true
  },
  with: {
    users: {
      columns: { id: true, name: true, firstName: true, lastName: true }
    }
  }
} satisfies Parameters<typeof db.query.projects.findFirst>[0];

export const getMyProjectQuery = cache(
  async (): Promise<ProjectType | null> => {
    const sessionUser = await getSessionUser();

    return await getStudentProjectQuery(sessionUser.id);
  }
);

export const getProjectQuery = cache(
  async (projectId: string): Promise<ProjectType | undefined> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error(`${sessionUser.id} cannot read projects`);
    }

    return await db.query.projects.findFirst({
      ...projectSelection,
      where: (projects, { eq }) => eq(projects.id, projectId)
    });
  }
);

export const getProjectsQuery = cache(async (): Promise<ProjectType[]> => {
  const sessionUser = await getSessionUser();

  if (sessionUser.role !== 'lector') {
    throw new Error(`${sessionUser.id} cannot read projects`);
  }

  return await db.query.projects.findMany(projectSelection);
});

export const getStudentProjectQuery = cache(
  async (studentId: string): Promise<ProjectType | null> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
      throw new Error(
        `${sessionUser.id} cannot read project for user ${studentId}`
      );
    }

    const project = await db.query.projects.findFirst({
      ...projectSelection,
      where: (projects, { eq, inArray }) =>
        inArray(
          projects.id,
          db
            .select({ projectId: users.projectId })
            .from(users)
            .where(eq(users.id, studentId))
        )
    });

    return project ?? null;
  }
);

export const getProjectFormStudentComboboxOptionsQuery = cache(
  async (projectId?: string): Promise<ProjectStudentOptionType[]> => {
    const sessionUser = await getSessionUser();
    const currentUser = await db.query.users.findFirst({
      columns: { projectId: true },
      where: (users, { eq }) => eq(users.id, sessionUser.id)
    });

    if (projectId) {
      if (currentUser?.projectId !== projectId) {
        throw new Error(
          `User ${sessionUser.id} is not allowed to update project ${projectId}`
        );
      }
    } else if (!currentUser || currentUser.projectId) {
      throw new Error(
        `User ${sessionUser.id} is not allowed to create a project.`
      );
    }

    const students = await db.query.users.findMany({
      columns: { id: true, firstName: true, lastName: true },
      where: (users, { and, or, eq, ne, isNull, isNotNull }) =>
        and(
          or(
            and(
              eq(users.role, 'student'),
              isNull(users.projectId),
              ne(users.id, sessionUser.id)
            ),
            projectId ? eq(users.projectId, projectId) : undefined
          ),
          isNotNull(users.github)
        )
    });

    return students.map(student => ({
      value: student.id,
      label: `${student.firstName} ${student.lastName}`
    }));
  }
);
