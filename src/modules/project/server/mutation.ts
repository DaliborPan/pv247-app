import { assignProject, getStudents } from '@/modules/student/server';
import { type ProjectInsert } from '@/db/schema/projects';
import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import { createProject, updateProject } from './repository';

export type CreateProjectMutationValuesType = Pick<
  Parameters<typeof createProject>[0],
  'name' | 'description' | 'github' | 'shortDescription'
>;

export const createProjectMutation = async (
  sessionUser: SessionUserType,
  studentIds: string[],
  values: CreateProjectMutationValuesType
) => {
  if (!!sessionUser.projectId || !studentIds.includes(sessionUser.id)) {
    throw new Error(
      `User ${sessionUser.id} is not allowed to create a project.`
    );
  }

  const [project] = await createProject(values);

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
  const currentProjectStudents = await getStudents({ projectId: id });

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

export type UpdateProjectStatusMutationValuesType = Pick<
  Parameters<typeof updateProject>[1],
  'status'
>;

export const updateProjectStatusMutation = async (
  sessionUser: SessionUserType,
  projectId: string,
  values: UpdateProjectStatusMutationValuesType
) => {
  if (sessionUser.projectId !== projectId && sessionUser.role !== 'lector') {
    throw new Error(
      `User ${sessionUser.id} is not allowed to update project ${projectId}`
    );
  }

  await updateProject(projectId, values);
};

export const updateProjectPointsMutation = async (
  _sessionUserLector: SessionUserLectorType,
  { id, comment, points }: { id: string; comment: string; points: number }
) => {
  await updateProject(id, { comment, points });
};
