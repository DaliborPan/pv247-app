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
import { RscFormsMdx } from './rsc-forms';
import { ApiActionsDatabaseMdx } from './api-actions-database';

type MdxComponent = ComponentType<{
	readonly components?: MDXComponents | undefined;
}>;

const homeworkMdxComponentsMap: Record<HomeworkSlug, MdxComponent> = {
	'typescript': TypescriptMdx,
	'react-basic': ReactBasictMdx,
	'styling': StylingMdx,
	'state': StateMdx,
	'table-memo': TableMemoMdx,
	'forms-async': FormsAsyncMdx,
	'nextjs-basic': NextjsBasicMdx,
	'rsc-forms': RscFormsMdx,
	'api-actions-database': ApiActionsDatabaseMdx,

	// Not used
	'': () => null
};

export const getHomeworkMdxComponent = (slug: HomeworkSlug) =>
	homeworkMdxComponentsMap[slug];
