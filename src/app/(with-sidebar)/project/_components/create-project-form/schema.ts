import { z } from 'zod';

export const createProjectFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	students: z.array(z.string())
});

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>;
