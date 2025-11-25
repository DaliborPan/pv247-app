import { type SessionUserType } from '@/modules/session-user/types';

import { projectRepository } from './repository';

export const getProjectsQuery = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`${sessionUser.id} cannot read projects`);
  }

  return projectRepository.getMany();
};

const get = async (sessionUser: SessionUserType, id: string) => {
  if (sessionUser.role !== 'lector' && sessionUser.projectId !== id) {
    throw new Error(`${sessionUser.id} cannot read project ${id}`);
  }

  const projects = await projectRepository.getMany();
  const project = projects.find(project => project.id === id);

  if (!project) {
    throw new Error(`Project ${id} not found`);
  }

  return project;
};

export const projectQueries = {
  get
};
