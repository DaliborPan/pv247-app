import { z } from 'zod';

export const studentHomeworkStatusSchema = z.enum([
  'pending',
  'repository_created',
  'ready'
]);
export type StudentHomeworkStatusType = z.infer<
  typeof studentHomeworkStatusSchema
>;

export const ownHomeworkRepositoryInputSchema = z.object({
  lectureId: z.string().min(1)
});
