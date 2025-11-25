import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';

import { getProjectsQuery, projectQueries, projectRepository } from './server';

const getWithPoints = async () => {
  const sessionUser = await getSessionUser();
  const projects = await getProjectsQuery(sessionUser);

  return projects.filter(project => !!project.points);
};

const getWithoutPoints = async () => {
  const sessionUser = await getSessionUser();
  const projects = await getProjectsQuery(sessionUser);

  return projects.filter(project => !project.points);
};

const get = async (id: string) => {
  const sessionUser = await getSessionUser();
  const projects = await getProjectsQuery(sessionUser);

  return projects.find(project => project.id === id);
};

const getMine = cache(async () => {
  const sessionUser = await getSessionUser();
  const userProjectId = sessionUser.projectId;

  if (!userProjectId) {
    return null;
  }

  return projectQueries.get(sessionUser, userProjectId);
});

export const projectLoaders = {
  getWithPoints,
  getWithoutPoints,
  getMine,
  get
};
