import { z } from 'zod';

/**
 * Lecture slug
 */
export const lectureSlugSchema = z.enum(['introduction', 'react', 'styling']);

export type LectureSlug = z.infer<typeof lectureSlugSchema>;
