import { z } from 'zod';

import { projectGithubSchema } from '@/modules/project/schema';

const projectFormSchema = z.object({
  name: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  github: projectGithubSchema.nullish()
});

export const createProjectSchema = projectFormSchema.extend({
  teamMemberIds: z.array(z.string()).min(1).max(3)
});

export type CreateProjectFormType = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = projectFormSchema;
export type UpdateProjectFormType = z.infer<typeof updateProjectSchema>;
