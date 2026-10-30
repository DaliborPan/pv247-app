import { z } from 'zod';

export const projectAssignmentSchema = z.enum([
  'meal-planner',
  'therapist-booking'
]);

export type ProjectAssignment = z.infer<typeof projectAssignmentSchema>;

export const projectAssignments = [
  {
    slug: 'meal-planner',
    title: 'Weekly Meal Planner',
    description:
      'Weekly meal plans based on personal preferences, with recipes and a shopping list.'
  },
  {
    slug: 'therapist-booking',
    title: 'Therapist Booking System',
    description:
      'Session booking for a therapist with availability, client management and a blog.'
  }
] satisfies { slug: ProjectAssignment; title: string; description: string }[];
