import { type MDXComponents } from 'mdx/types';
import { type ComponentType } from 'react';

import MealPlannerMdx from './mdx/meal-planner.mdx';
import TherapistBookingMdx from './mdx/therapist-booking.mdx';

type ProjectExampleType = {
  slug: string;
  title: string;
  description?: string;
  Content: ComponentType<{ components?: MDXComponents }>;
};

export const projectExamples: ProjectExampleType[] = [
  {
    slug: 'meal-planner',
    title: 'Weekly Meal Planner',
    description:
      'AI-generated weekly meal plan based on personal preferences, with recipes and a shopping list.',
    Content: MealPlannerMdx
  },
  {
    slug: 'therapist-booking',
    title: 'Therapist Booking System',
    description:
      'Session booking for a therapist with availability, client management, payment details and a blog.',
    Content: TherapistBookingMdx
  }
];
