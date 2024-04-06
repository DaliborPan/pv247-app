import { type ComponentType } from 'react';

import { type LectureSlug } from '@/schema/lecture';

import { IntroductionMdx } from './introduction';
import { ReactMdx } from './react';

type MdxComponent = ComponentType<{ readonly components?: object | undefined }>;

const lectureMdxComponentsMap: Record<LectureSlug, MdxComponent> = {
	introduction: IntroductionMdx,
	react: ReactMdx
};

export const getLectureMdxComponent = (slug: LectureSlug) =>
	lectureMdxComponentsMap[slug];
