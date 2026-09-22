import { type MDXComponents } from 'mdx/types';
import { type ComponentType } from 'react';

import { type LectureSlugType } from '../schema';
import ApiConfigsServerActionsDatabaseMdx from './api-configs-server-actions-database/api-configs-server-actions-database.mdx';
import AsyncFormsMdx from './async-forms/async-forms.mdx';
import AuthenticationMetadataDeploymentMdx from './authentication-metadata-deployment/authentication-metadata-deployment.mdx';
import HooksMdx from './hooks/hooks.mdx';
import IntroductionMdx from './introduction/introduction.mdx';
import NextjsMdx from './nextjs/nextjs.mdx';
import OtherHooksRefsTablesMdx from './other-hooks-refs-tables/other-hooks-refs-tables.mdx';
import ReactMdx from './react/react.mdx';
import StylingMdx from './styling/styling.mdx';
import SuspenseStreamingRscMdx from './suspense-streaming-rsc/suspense-streaming-rsc.mdx';

type MdxComponent = ComponentType<{
  readonly components?: MDXComponents | undefined;
}>;

const lectureMdxComponentsMap: Record<LectureSlugType, MdxComponent> = {
  'introduction': IntroductionMdx,
  'react': ReactMdx,
  'styling': StylingMdx,
  'hooks': HooksMdx,
  'other-hooks-refs-tables': OtherHooksRefsTablesMdx,
  'async-forms': AsyncFormsMdx,
  'nextjs': NextjsMdx,
  'suspense-streaming-rsc': SuspenseStreamingRscMdx,
  'api-configs-server-actions-database': ApiConfigsServerActionsDatabaseMdx,
  'authentication-metadata-deployment': AuthenticationMetadataDeploymentMdx
};

export const getLectureMdxComponent = (slug: LectureSlugType) =>
  lectureMdxComponentsMap[slug];
