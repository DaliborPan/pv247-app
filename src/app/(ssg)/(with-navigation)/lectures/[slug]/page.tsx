import { redirect } from 'next/navigation';

import { lectureSlugSchema, type LectureSlug } from '@/db';
import { getLectureMdxComponent } from '@/modules/lecture/mdx';
import { getIsLectureAvailable } from '@/modules/lecture/server';

type Params = {
	slug: LectureSlug;
};

export const generateStaticParams = (): Params[] => {
	const lectures = lectureSlugSchema.options;

	return lectures.map(slug => ({
		slug
	}));
};

const Page = async ({ params }: { params: Params }) => {
	const isAvailable = await getIsLectureAvailable(params.slug);

	if (!isAvailable) {
		redirect('/lectures');
	}

	const MdxComponent = getLectureMdxComponent(params.slug);

	return <MdxComponent />;
};

export default Page;
