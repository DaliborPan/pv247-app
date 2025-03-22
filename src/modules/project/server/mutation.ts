import { db, projects } from '@/db';
import {
  assignProject,
  getStudentsByProjectId
} from '@/modules/student/server';
import { type ProjectInsert } from '@/db/schema/projects';
import { type SessionUserType } from '@/modules/session-user/types';

import { updateProject } from './repository';

export const createProjectMutation = async (
  sessionUser: SessionUserType,
  studentIds: string[],
  values: Pick<
    ProjectInsert,
    'name' | 'description' | 'github' | 'shortDescription'
  >
) => {
  if (!studentIds.includes(sessionUser.id)) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to create a project.`
    );
  }

  const [project] = await db.insert(projects).values(values).returning();

  await assignProject({ projectId: project.id, userIds: studentIds });
};

export const updateProjectMutation = async (
  sessionUser: SessionUserType,
  id: string,
  studentIds: string[],
  values: Pick<
    ProjectInsert,
    'name' | 'description' | 'github' | 'shortDescription'
  >
) => {
  const currentProjectStudents = await getStudentsByProjectId(id);

  if (!currentProjectStudents.some(user => user.id === sessionUser.id)) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to update project ${id}`
    );
  }

  await updateProject(id, values);

  // Remove students from previous project
  await assignProject({
    projectId: null,
    userIds: currentProjectStudents.map(user => user.id)
  });

  // Add students to new project
  await assignProject({ projectId: id, userIds: studentIds });
};
