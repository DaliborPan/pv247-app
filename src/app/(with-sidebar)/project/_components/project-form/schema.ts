import { z } from 'zod';

export const projectFormSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	students: z.array(z.string())
});

export type ProjectFormSchema = z.infer<typeof projectFormSchema>;
