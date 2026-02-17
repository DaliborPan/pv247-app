import { z } from 'zod';

/**
 * Special case of importing schemas from database, because we want
 * to have enums in database directly.
 *
 * Reexporting them from this file to allow other components/... to import from here
 */
import { dbHomeworkSlugSchema } from '@/db/schema/lectures/homework-slug';
import { dbLectureSlugSchema } from '@/db/schema/lectures/lecture-slug';

export const lectureSlugSchema = dbLectureSlugSchema;
export type LectureSlugType = z.infer<typeof lectureSlugSchema>;

export const homeworkSlugSchema = dbHomeworkSlugSchema;
export type HomeworkSlugType = z.infer<typeof homeworkSlugSchema>;

export const lectureSchema = z.object({
  id: z.string(),
  name: z.string(),
  availableFrom: z.string(),
  slug: lectureSlugSchema,
  preview: z.string(),
  attendanceToken: z.string(),
  isAvailable: z.boolean(),

  // homework
  homeworkName: z.string(),
  homeworkSlug: homeworkSlugSchema,
  homeworkPreview: z.string(),
  homeworkClassroomLink: z.string(),
  homeworkMaxPoints: z.number(),
  homeworkDeadline: z.string()
});

export type LectureType = z.infer<typeof lectureSchema>;
