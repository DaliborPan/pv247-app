import { z } from 'zod';

export const dbProjectStatusSchema = z.enum([
  'CREATED',
  'APPROVED',
  'COMPLETED',
  "FAILED"
]);
