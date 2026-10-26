import { type MDXComponents } from 'mdx/types';
import { type ComponentType } from 'react';

import MealPlannerMdx from './mdx/meal-planner.mdx';
import TbaMdx from './mdx/tba.mdx';

type ProjectExampleType = {
  slug: string;
  title: string;
  description?: string;
  Content: ComponentType<{ components?: MDXComponents }>;
};

export const projectExamples: ProjectExampleType[] = [
  {
    slug: 'meal-planner',
    title: 'Plánovač týdenních jídel',
    description:
      'Týdenní jídelníček podle osobních preferencí, recepty a nákupní seznam s pomocí AI.',
    Content: MealPlannerMdx
  },
  {
    slug: 'tba',
    title: 'TBA',
    Content: TbaMdx
  }
];
