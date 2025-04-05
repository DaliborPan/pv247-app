import { z } from 'zod';

export const dbProjectStatusSchema = z.enum([
  'pending',
  'approved',
  'submitted'
]);
