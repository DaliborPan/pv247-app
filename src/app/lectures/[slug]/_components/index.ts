import { type ComponentType } from 'react';

import { type LectureSlug } from '@/schema/lecture';

import { Introduction } from './introduction';

type MdxComponent = ComponentType<{ readonly components?: object | undefined }>;

const lectureMdxComponentsMap: Record<LectureSlug, MdxComponent> = {
	introduction: Introduction,
	react: Introduction
};

export const getLectureMdxComponent = (slug: LectureSlug) =>
	lectureMdxComponentsMap[slug];
