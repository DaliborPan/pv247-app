import { type SessionUserType } from '@/modules/session-user/types';

import { projectRepository } from './repository';

export const getProjectsQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`${sessionUser.id} cannot read projects`);
  }

  return projectRepository.getMany();
};

const get = async (
  sessionUser: SessionUserType,
  { userId }: { userId: string }
) => {
  if (sessionUser.role !== 'lector' && sessionUser.id !== userId) {
    throw new Error(`${sessionUser.id} cannot read project for user ${userId}`);
  }

  const projects = await projectRepository.getMany();
  const project = projects.find(project =>
    project.users.some(projectUser => projectUser.id === userId)
  );

  if (!project) {
    return null;
  }

  return project;
};

export const projectQueries = {
  get
};
