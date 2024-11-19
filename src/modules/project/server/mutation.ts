import { eq } from 'drizzle-orm';

import { db, type Project, projects } from '@/db';
import { assignProject } from '@/modules/student';
import { type ProjectInsert } from '@/db/schema/projects';

export const createProject = async (
  data: Pick<ProjectInsert, 'name' | 'description' | 'github'>
) => {
  const [project] = await db.insert(projects).values(data).returning();

  return project;
};

export const updateProject = async (
  id: string,
  { studentIds, ...data }: Partial<Project> & { studentIds?: string[] }
) => {
  await db.update(projects).set(data).where(eq(projects.id, id)).execute();

  if (!studentIds) return;

  const previousStudents = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.projectId, id)
  });

  // Remove students from previous project
  await assignProject({
    projectId: null,
    studentIds: previousStudents.map(user => user.id)
  });

  // Add students to new project
  await assignProject({ projectId: id, studentIds });
};
