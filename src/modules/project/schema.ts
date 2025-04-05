import { z } from 'zod';

export const projectStatusSchema = z.enum(['pending', 'approved', 'submitted']);

export type ProjectStatusType = z.infer<typeof projectStatusSchema>;

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  shortDescription: z.string().nullable(),
  github: z.string().nullable(),
  points: z.number().nullable(),
  comment: z.string().nullable(),
  status: projectStatusSchema,
  updatedAt: z.string()
});

export type ProjectType = z.infer<typeof projectSchema>;
