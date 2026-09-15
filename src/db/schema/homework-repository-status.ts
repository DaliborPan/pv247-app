import { z } from 'zod';

export const dbHomeworkRepositoryStatusSchema = z.enum([
  'pending',
  'repository_created',
  'ready'
]);
