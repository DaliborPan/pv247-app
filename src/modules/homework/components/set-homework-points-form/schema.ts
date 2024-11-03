import { z } from 'zod';

// Need to import from @/db/schema/lectures beucase of circular dep
import { homeworkSlugSchema } from '@/db/schema/lectures';

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
