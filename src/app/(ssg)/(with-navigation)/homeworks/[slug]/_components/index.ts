import { type ComponentType } from 'react';
import { type MDXComponents } from 'mdx/types';

import { type HomeworkSlug } from '@/db';

import { TypescriptMdx } from './typescript';
import { ReactBasictMdx } from './react-basic';
import { StylingMdx } from './styling';

type MdxComponent = ComponentType<{
	readonly components?: MDXComponents | undefined;
}>;

const homeworkMdxComponentsMap: Record<HomeworkSlug, MdxComponent> = {
	// TODO
	'typescript': TypescriptMdx,
	'react-basic': ReactBasictMdx,
	'styling': StylingMdx,
	'state': TypescriptMdx,
	'table-memo': TypescriptMdx,
	'forms-async': TypescriptMdx,
	'nextjs-basic': TypescriptMdx,
	'rsc-forms': TypescriptMdx,
	'api-actions-database': TypescriptMdx,

	// Not used
	'': TypescriptMdx
};

export const getHomeworkMdxComponent = (slug: HomeworkSlug) =>
	homeworkMdxComponentsMap[slug];
