import { z } from 'zod';

export const setHomeworkPointsFormSchema = z.object({
	studentId: z.string(),
	lectorId: z.string(),
	lecture: z.object({
		id: z.string(),
		homeworkName: z.string()
	}),

	points: z.coerce.number()
});

export type SetHomeworkPointsFormSchema = z.infer<
	typeof setHomeworkPointsFormSchema
>;
