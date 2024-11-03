'use server';

import { revalidateTag } from 'next/cache';

import { PROJECTS_TAG, updateProject } from '@/modules/project/server';

import { type SetProjectPointsFormSchema } from './schema';

export const setProjectPointsAction = async ({
  projectId,
  comment,
  points
}: SetProjectPointsFormSchema) => {
  await updateProject(projectId, { comment, points });

  revalidateTag(PROJECTS_TAG);
};
