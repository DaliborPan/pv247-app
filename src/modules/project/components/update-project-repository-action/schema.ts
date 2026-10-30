import { z } from 'zod';

import { projectGithubSchema } from '@/modules/project/schema';

export const updateProjectRepositoryFormSchema = z.object({
  github: projectGithubSchema
});

export type UpdateProjectRepositoryFormType = z.infer<
  typeof updateProjectRepositoryFormSchema
>;
