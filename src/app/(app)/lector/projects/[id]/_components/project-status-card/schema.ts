import { z } from 'zod';

export const setProjectPointsFormSchema = z.object({
  projectId: z.string(),
  points: z.coerce.number(),
  comment: z.string()
});

export type SetProjectPointsFormSchema = z.infer<
  typeof setProjectPointsFormSchema
>;
