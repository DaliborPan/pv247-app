import { type ComponentType } from 'react';
import { type MDXComponents } from 'mdx/types';

import { type HomeworkSlugType } from '@/modules/lecture/schema';

import TypescriptMdx from './typescript/typescript.mdx';
import ReactBasictMdx from './react-basics/react-basics.mdx';
import StylingMdx from './styling/styling.mdx';
import StateMdx from './state/state.mdx';
import TableMemoMdx from './table-memo/table-memo.mdx';
import FormsAsyncMdx from './forms-async/forms-async.mdx';
import NextjsBasicMdx from './nextjs-basic/nextjs-basic.mdx';
import RscFormsMdx from './rsc-forms/rsc-forms.mdx';
import ApiActionsDatabaseMdx from './api-actions-database/api-actions-database.mdx';

type MdxComponent = ComponentType<{
  readonly components?: MDXComponents | undefined;
}>;

const homeworkMdxComponentsMap: Record<HomeworkSlugType, MdxComponent> = {
  'typescript': TypescriptMdx,
  'react-basics': ReactBasictMdx,
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

export const getHomeworkMdxComponent = (slug: HomeworkSlugType) =>
  homeworkMdxComponentsMap[slug];
