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
	const MdxComponent = getLectureMdxComponent(params.slug);

	return <MdxComponent />;
};

export default Page;
