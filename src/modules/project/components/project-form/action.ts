'use server';

import { revalidateTag } from 'next/cache';

import {
  createProject,
  PROJECTS_TAG,
  updateProject
} from '@/modules/project/server';
import { assignProject } from '@/modules/student';

import { type ProjectFormSchema } from './schema';

export const createProjectAction = async ({
  students,
  name,
  description
}: ProjectFormSchema) => {
  const project = await createProject({ name, description });

  await assignProject({ projectId: project.id, studentIds: students });

  revalidateTag(PROJECTS_TAG);
};

export const updateProjectAction = async ({
  id,
  students,
  name,
  github,
  description
}: ProjectFormSchema) => {
  if (!id) return;

  await updateProject(id, { name, description, github, studentIds: students });

  revalidateTag(PROJECTS_TAG);
};
