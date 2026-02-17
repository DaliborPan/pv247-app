import { z } from 'zod';

export const setProjectPointsFormSchema = z.object({
  projectId: z.string(),
  status: z.enum(['COMPLETED', 'FAILED']),
  comment: z.string()
});

export type SetProjectPointsFormSchema = z.infer<
  typeof setProjectPointsFormSchema
>;
