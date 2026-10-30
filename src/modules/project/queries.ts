import 'server-only';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

import { db } from '@/db';
import { projects } from '@/db/schema/projects/projects';
import { getSessionUser } from '@/modules/session-user/session-user';

import { type SessionUserType } from '../session-user/types';
import { type ProjectStudentOptionType, type ProjectType } from './types';

const projectSelection = {
  columns: {
    id: true,
    name: true,
    assignment: true,
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

export const getStudentProject = async ({
  sessionUser,
  studentId
}: {
  sessionUser: SessionUserType;
  studentId: string;
}) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== studentId) {
    throw new Error(
      `${sessionUser.id} cannot read project for user ${studentId}`
    );
  }

  const user = await db.query.users.findFirst({
    columns: { projectId: true, role: true },
    where: (users, { eq }) => eq(users.id, studentId)
  });

  if (user?.role !== 'student') {
    throw new Error(`User ${studentId} is not a student`);
  }

  if (!user.projectId) {
    return null;
  }

  const project = await db.query.projects.findFirst({
    ...projectSelection,
    where: eq(projects.id, user.projectId)
  });

  return project ?? null;
};

export const getStudentProjectQuery = cache(
  async (studentId: string): Promise<ProjectType | null> =>
    await getStudentProject({
      sessionUser: await getSessionUser(),
      studentId
    })
);

export const getProjectFormStudentComboboxOptionsQuery = cache(
  async (): Promise<ProjectStudentOptionType[]> => {
    const sessionUser = await getSessionUser();
    const currentUser = await db.query.users.findFirst({
      columns: { projectId: true },
      where: (users, { eq }) => eq(users.id, sessionUser.id)
    });

    if (
      sessionUser.role !== 'student' ||
      !currentUser ||
      currentUser.projectId
    ) {
      throw new Error(
        `User ${sessionUser.id} is not allowed to create a project.`
      );
    }

    const students = await db.query.users.findMany({
      columns: { id: true, name: true, firstName: true, lastName: true },
      where: (users, { and, eq, ne, isNull }) =>
        and(
          eq(users.role, 'student'),
          isNull(users.projectId),
          ne(users.id, sessionUser.id)
        )
    });

    return students.map(student => ({
      value: student.id,
      label:
        [student.firstName, student.lastName].filter(Boolean).join(' ') ||
        student.name
    }));
  }
);
