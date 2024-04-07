import { z } from 'zod';

/**
 * Homework slug
 */
export const homeworkSlugSchema = z.enum(['typescript', 'react']);

export type HomeworkSlug = z.infer<typeof homeworkSlugSchema>;
