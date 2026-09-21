import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  github: z.string()
});

export type ProfileFormType = z.infer<typeof profileFormSchema>;
