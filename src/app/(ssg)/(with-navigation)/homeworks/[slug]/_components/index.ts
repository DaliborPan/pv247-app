import { type ComponentType } from 'react';
import { type MDXComponents } from 'mdx/types';

import { type HomeworkSlug } from '@/db';

import { TypescriptMdx } from './typescript';
import { ReactBasictMdx } from './react-basic';
import { StylingMdx } from './styling';
import { StateMdx } from './state';
import { TableMemoMdx } from './table-memo';
import { FormsAsyncMdx } from './forms-async';
import { NextjsBasicMdx } from './nextjs-basic';

type MdxComponent = ComponentType<{
	readonly components?: MDXComponents | undefined;
}>;

const homeworkMdxComponentsMap: Record<HomeworkSlug, MdxComponent> = {
	// TODO
	'typescript': TypescriptMdx,
	'react-basic': ReactBasictMdx,
	'styling': StylingMdx,
	'state': StateMdx,
	'table-memo': TableMemoMdx,
	'forms-async': FormsAsyncMdx,
	'nextjs-basic': NextjsBasicMdx,
	'rsc-forms': TypescriptMdx,
	'api-actions-database': TypescriptMdx,

	// Not used
	'': TypescriptMdx
};

export const getHomeworkMdxComponent = (slug: HomeworkSlug) =>
	homeworkMdxComponentsMap[slug];
