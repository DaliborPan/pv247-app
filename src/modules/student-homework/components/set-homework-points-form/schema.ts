import { z } from 'zod';

export const setHomeworkPointsFormSchema = z.object({
  studentId: z.string(),
  lectureId: z.string(),
  points: z.coerce.number()
});

export type SetHomeworkPointsFormSchema = z.infer<
  typeof setHomeworkPointsFormSchema
>;
