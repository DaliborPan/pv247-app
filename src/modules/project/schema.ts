import { z } from 'zod';

export const projectGithubSchema = z
  .string()
  .trim()
  .refine(
    value =>
      !value || /^https:\/\/github\.com\/[^\s/?#]+\/[^\s/?#]+\/?$/.test(value),
    'Enter a GitHub repository URL, e.g. https://github.com/team/project.'
  );

export const projectStatusSchema = z.enum([
  'CREATED',
  'APPROVED',
  'COMPLETED',
  'FAILED'
]);
export type ProjectStatusType = z.infer<typeof projectStatusSchema>;
