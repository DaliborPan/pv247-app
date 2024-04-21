import { type ComponentType } from 'react';
import { type MDXComponents } from 'mdx/types';

import { type LectureSlug } from '@/db';

import { IntroductionMdx } from './introduction';
import { ReactMdx } from './react';
import { ApiConfigsServerActionsDatabaseMdx } from './api-configs-server-actions-database';
import { AuthenticationMetadataDeploymentMdx } from './authentication-metadata-deployment';
import { StylingMdx } from './styling';
import { HooksMdx } from './hooks';

type MdxComponent = ComponentType<{
	readonly components?: MDXComponents | undefined;
}>;

const lectureMdxComponentsMap: Record<LectureSlug, MdxComponent> = {
	'introduction': IntroductionMdx,
	'react': ReactMdx,
	'styling': StylingMdx,
	'hooks': HooksMdx,
	// TODO
	'other-hooks-refs-tables': ReactMdx,
	'async-forms': ReactMdx,
	'nextjs': ReactMdx,
	'suspense-streaming-rsc': ReactMdx,
	'api-configs-server-actions-database': ApiConfigsServerActionsDatabaseMdx,
	'authentication-metadata-deployment': AuthenticationMetadataDeploymentMdx
};

export const getLectureMdxComponent = (slug: LectureSlug) =>
	lectureMdxComponentsMap[slug];
