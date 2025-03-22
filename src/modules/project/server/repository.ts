import { eq } from 'drizzle-orm';

import { db, type Project, projects } from '@/db';

export const updateProject = (id: string, data: Partial<Project>) =>
  db.update(projects).set(data).where(eq(projects.id, id));

export const getProjectById = (id: string) =>
  db.query.projects.findFirst({
    where: (table, { eq }) => eq(table.id, id)
  });
