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

  return projectQueries.get(sessionUser, {
    userId: sessionUser.id
  });
});

export const projectLoaders = {
  getWithPoints,
  getWithoutPoints,
  getMine,
  get
};
