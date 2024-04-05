import { z } from 'zod';

export const projectFormSchema = z.object({
	name: z.string(),
	description: z.string(),
	students: z.array(z.string())
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
