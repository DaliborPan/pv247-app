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
