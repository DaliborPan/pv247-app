import { z } from 'zod';

export const homeworkRepositoryStatusSchema = z.enum([
  'pending',
  'repository_created',
  'ready'
]);
export type HomeworkRepositoryStatusType = z.infer<
  typeof homeworkRepositoryStatusSchema
>;

export const ownHomeworkRepositoryInputSchema = z.object({
  lectureId: z.string().min(1)
});
