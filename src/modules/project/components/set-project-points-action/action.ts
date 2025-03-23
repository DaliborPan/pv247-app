'use server';

import { updateProject } from '@/modules/project/server';

import { type SetProjectPointsFormSchema } from './schema';

export const setProjectPointsAction = async ({
  projectId,
  comment,
  points
}: SetProjectPointsFormSchema) => {
  await updateProject(projectId, { comment, points });

  // revalidateTag(PROJECTS_TAG);
};
