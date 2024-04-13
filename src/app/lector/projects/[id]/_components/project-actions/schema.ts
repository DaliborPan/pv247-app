import { z } from 'zod';

export const setProjectPointsFormSchema = z.object({
	projectId: z.string(),
	points: z.number(),
	comment: z.string()
});

export type SetProjectPointsForm = z.infer<typeof setProjectPointsFormSchema>;
