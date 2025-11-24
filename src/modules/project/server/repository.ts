import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { type ProjectInsertType, projects } from '@/db/schema/projects';

export const createProject = (values: Omit<ProjectInsertType, 'id'>) =>
  db.insert(projects).values(values).returning();

export const updateProject = (
  id: string,
  data: Partial<Omit<ProjectInsertType, 'id'>>
) => db.update(projects).set(data).where(eq(projects.id, id));

export const getMany = () =>
  db.query.projects.findMany({
    with: {
      users: true
    }
  });

export const projectRepository = {
  getMany
};
