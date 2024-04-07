import { z } from 'zod';

export const baseObjectSchema = z.object({
	id: z.string()
});

export type BaseObject = z.infer<typeof baseObjectSchema>;
