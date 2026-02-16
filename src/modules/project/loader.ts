import { cache } from 'react';

import { getSessionUser } from '@/modules/session-user';

import { getProjectsQuery, projectQueries } from './server';

const getCompleted = async () => {
  const sessionUser = await getSessionUser();
  const projects = await getProjectsQuery(sessionUser);

  return projects.filter(project => project.status === 'COMPLETED');
};

const getCreatedOrApproved = async () => {
  const sessionUser = await getSessionUser();
  const projects = await getProjectsQuery(sessionUser);

  return projects.filter(
    project => project.status === 'CREATED' || project.status === 'APPROVED'
  );
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
  getCompleted,
  getCreatedOrApproved,
  getMine,
  get
};
