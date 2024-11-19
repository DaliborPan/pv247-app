'use server';

import { revalidateTag } from 'next/cache';

import { createProject, PROJECTS_TAG, updateProject } from '@/modules/project';
import { assignProject } from '@/modules/student';

import { type ProjectFormSchema } from './schema';

export const createProjectAction = async ({
  students,

  name,
  description,
  shortDescription,
  github
}: ProjectFormSchema) => {
  const project = await createProject({
    name,
    description,
    shortDescription,
    github
  });

  await assignProject({ projectId: project.id, studentIds: students });

  revalidateTag(PROJECTS_TAG);
};

export const updateProjectAction = async ({
  id,
  students,

  name,
  description,
  shortDescription,
  github
}: ProjectFormSchema) => {
  if (!id) return;

  await updateProject(id, {
    name,
    description,
    shortDescription,
    github,
    studentIds: students
  });

  revalidateTag(PROJECTS_TAG);
};
