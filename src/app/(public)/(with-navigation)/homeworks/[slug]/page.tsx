import { redirect } from 'next/navigation';

import { type HomeworkSlug, homeworkSlugSchema } from '@/db';

import { getHomeworkMdxComponent } from './_components';

type Params = {
	slug: HomeworkSlug;
};

export const generateStaticParams = (): Params[] => {
	const slugs = homeworkSlugSchema.options;

	return slugs
		.filter(slug => slug !== '')
		.map(slug => ({
			slug
		}));
};

const Page = ({ params }: { params: Params }) => {
	const parsed = homeworkSlugSchema.safeParse(params.slug);

	if (!parsed.success) {
		redirect('/homeworks');
	}

	const MdxComponent = getHomeworkMdxComponent(parsed.data);

	return <MdxComponent />;
};

export default Page;
