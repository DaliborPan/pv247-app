import { z } from 'zod';

export const studentLectureSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  lectureId: z.string()
});

export type StudentLectureType = z.infer<typeof studentLectureSchema>;
