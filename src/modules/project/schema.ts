import { z } from 'zod';

export const projectStatusSchema = z.enum([
  'CREATED',
  'APPROVED',
  'COMPLETED',
  'FAILED'
]);
export type ProjectStatusType = z.infer<typeof projectStatusSchema>;
