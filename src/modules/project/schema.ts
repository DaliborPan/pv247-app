import { z } from 'zod';

/**
 * Special case of importing schemas from database, because we want
 * to have enums in database directly.
 *
 * Reexporting them from this file to allow other components/... to import from here
 */
import { dbProjectStatusSchema } from '@/db/schema/projects/project-status';

export const projectStatusSchema = dbProjectStatusSchema;
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
