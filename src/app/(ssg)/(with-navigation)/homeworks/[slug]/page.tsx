import { redirect } from 'next/navigation';

import { type HomeworkSlug, homeworkSlugSchema } from '@/db';
import { getIsHomeworkAvailable } from '@/modules/lecture/server';

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

const Page = async ({ params }: { params: Params }) => {
	const isAvailable = await getIsHomeworkAvailable(params.slug);

	if (!isAvailable) {
		redirect('/homeworks');
	}

	const MdxComponent = getHomeworkMdxComponent(params.slug);

	return <MdxComponent />;
};

export default Page;
