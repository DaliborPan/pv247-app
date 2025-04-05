import { z } from 'zod';

import { homeworkSlugSchema } from '@/modules/lecture/schema';

export const setHomeworkPointsFormSchema = z.object({
  studentId: z.string(),
  lectorId: z.string(),
  lecture: z.object({
    id: z.string(),
    homeworkName: z.string(),
    homeworkSlug: homeworkSlugSchema
  }),

  points: z.coerce.number()
});

export type SetHomeworkPointsFormSchema = z.infer<
  typeof setHomeworkPointsFormSchema
>;
