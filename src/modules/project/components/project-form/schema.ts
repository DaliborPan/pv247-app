import { z } from 'zod';

import { projectGithubSchema } from '@/modules/project/schema';

const projectFormSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required.'),
  shortDescription: z.string().trim().min(1, 'Short overview is required.'),
  description: z.string().refine(
    value =>
      value
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;|&#160;/gi, ' ')
        .trim().length > 0,
    'Project description is required.'
  ),
  github: projectGithubSchema.nullish()
});

export const createProjectSchema = projectFormSchema.extend({
  teamMemberIds: z.array(z.string()).min(1).max(3)
});

export type CreateProjectFormType = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = projectFormSchema;
export type UpdateProjectFormType = z.infer<typeof updateProjectSchema>;
