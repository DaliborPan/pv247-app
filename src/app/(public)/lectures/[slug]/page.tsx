import { redirect } from 'next/navigation';

import { lectureSlugSchema, type LectureSlug } from '@/db';

import { getLectureMdxComponent } from './_components';

type Params = {
	slug: LectureSlug;
};

export const generateStaticParams = (): Params[] => {
	const lectures = lectureSlugSchema.options;

	return lectures.map(slug => ({
		slug
	}));
};

const Page = ({ params }: { params: Params }) => {
	const parsed = lectureSlugSchema.safeParse(params.slug);
	console.log('RUNNING PAGE - ', params.slug);

	if (!parsed.success) {
		redirect('/lectures');
	}

	const MdxComponent = getLectureMdxComponent(parsed.data);

	return <MdxComponent />;
};

export default Page;
