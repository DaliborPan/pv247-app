import { type ComponentType } from 'react';
import { type MDXComponents } from 'mdx/types';

import { type LectureSlug } from '@/db';

import { IntroductionMdx } from './introduction';
import { ReactMdx } from './react';
import { ApiConfigsServerActionsDatabaseMdx } from './api-configs-server-actions-database';
import { AuthenticationMetadataDeploymentMdx } from './authentication-metadata-deployment';
import { StylingMdx } from './styling';
import { HooksMdx } from './hooks';
import { OtherHooksRefsTablesMdx } from './other-hooks-refs-tables';
import { AsyncFormsMdx } from './async-forms';
import { NextjsMdx } from './nextjs';
import { SuspenseStreamingRscMdx } from './suspense-streaming-rsc';

type MdxComponent = ComponentType<{
  readonly components?: MDXComponents | undefined;
}>;

const lectureMdxComponentsMap: Record<LectureSlug, MdxComponent> = {
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

export const getLectureMdxComponent = (slug: LectureSlug) =>
  lectureMdxComponentsMap[slug];
