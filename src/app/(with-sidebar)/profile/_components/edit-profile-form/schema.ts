import { z } from 'zod';

export const editProfileFormSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string()
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
