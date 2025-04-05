import { z } from 'zod';

export const homeworkSchema = z.object({
  id: z.string(),
  name: z.string(),
  points: z.number(),
  studentId: z.string().nullable(),
  lectorId: z.string().nullable(),
  lectureId: z.string().nullable()
});

export type HomeworkType = z.infer<typeof homeworkSchema>;
