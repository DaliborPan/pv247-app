import { z } from 'zod';

export const projectFormSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	students: z.array(z.string()),
	github: z.string().optional()
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
