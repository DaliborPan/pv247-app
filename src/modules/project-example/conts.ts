import { type MDXComponents } from 'mdx/types';
import { type ComponentType } from 'react';

import { projectAssignments } from './assignments';
import MealPlannerMdx from './mdx/meal-planner.mdx';
import TherapistBookingMdx from './mdx/therapist-booking.mdx';

type ProjectExampleType = {
  slug: string;
  title: string;
  description?: string;
  Content: ComponentType<{ components?: MDXComponents }>;
};

const assignmentContent = {
  'meal-planner': MealPlannerMdx,
  'therapist-booking': TherapistBookingMdx
};

export const projectExamples: ProjectExampleType[] = projectAssignments.map(
  assignment => ({ ...assignment, Content: assignmentContent[assignment.slug] })
);
