import { db, projects } from '@/db';
import {
  assignProject,
  getStudentsByProjectId
} from '@/modules/student/server';
import { type ProjectInsert } from '@/db/schema/projects';
import { type SessionUserType } from '@/modules/session-user/types';

import { updateProject } from './repository';

export const createProjectMutation = async (
  _sessionUser: SessionUserType,
  studentIds: string[],
  values: Pick<
    ProjectInsert,
    'name' | 'description' | 'github' | 'shortDescription'
  >
) => {
  const [project] = await db.insert(projects).values(values).returning();

  await assignProject({ projectId: project.id, userIds: studentIds });

  return project;
};

export const updateProjectMutation = async (
  _sessionUser: SessionUserType,
  id: string,
  studentIds: string[],
  values: Pick<
    ProjectInsert,
    'name' | 'description' | 'github' | 'shortDescription'
  >
) => {
  // TODO(pv) - authorization check - sessionUser is allowed to update project with `id`

  await updateProject(id, values);

  if (!studentIds) return;

  const previousStudents = await getStudentsByProjectId(id);

  // Remove students from previous project
  await assignProject({
    projectId: null,
    userIds: previousStudents.map(user => user.id)
  });

  // Add students to new project
  await assignProject({ projectId: id, userIds: studentIds });
};
