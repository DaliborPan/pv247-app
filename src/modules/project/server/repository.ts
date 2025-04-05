import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { type ProjectInsert, projects } from '@/db/schema/projects';

export const createProject = (data: ProjectInsert) =>
  db.insert(projects).values(data).returning();

export const updateProject = (id: string, data: Partial<ProjectInsert>) =>
  db.update(projects).set(data).where(eq(projects.id, id));

export const getProjectById = (id: string) =>
  db.query.projects.findFirst({
    where: (table, { eq }) => eq(table.id, id)
  });

export const getProjects = () =>
  db.query.projects.findMany({
    with: {
      users: true
    }
  });
