import { z } from 'zod';

export const editProfileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  github: z.string()
});

export type EditProfileFormType = z.infer<typeof editProfileFormSchema>;
