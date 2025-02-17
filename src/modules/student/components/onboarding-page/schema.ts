import { z } from 'zod';

export const onboardingFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  github: z.string()
});

export type OnboardingFormSchema = z.infer<typeof onboardingFormSchema>;
