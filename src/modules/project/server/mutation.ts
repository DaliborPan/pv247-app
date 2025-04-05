import { assignProject, getStudents } from '@/modules/student/server';
import {
  type SessionUserLectorType,
  type SessionUserType
} from '@/modules/session-user/types';

import { createProject, updateProject } from './repository';

type CreateProjectMutationValuesType = Pick<
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

type UpdateProjectMutationValuesType = Pick<
  Parameters<typeof updateProject>[1],
  'name' | 'description' | 'github' | 'shortDescription'
>;

export const updateProjectMutation = async (
  sessionUser: SessionUserType,
  id: string,
  studentIds: string[],
  values: UpdateProjectMutationValuesType
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

type UpdateProjectStatusMutationValuesType = Pick<
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

type UpdateProjectPointsMutationValuesType = Pick<
  Parameters<typeof updateProject>[1],
  'comment' | 'points'
>;

export const updateProjectPointsMutation = async (
  _sessionUserLector: SessionUserLectorType,
  projectId: string,
  values: UpdateProjectPointsMutationValuesType
) => {
  await updateProject(projectId, values);
};
