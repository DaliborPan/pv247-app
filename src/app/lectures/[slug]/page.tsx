import { redirect } from 'next/navigation';

import { lectureSlugSchema } from '@/schema/lecture';

import { getLectureMdxComponent } from './_components';

const Page = ({ params }: { params: { slug: string } }) => {
	const parsed = lectureSlugSchema.safeParse(params.slug);

	if (!parsed.success) {
		redirect('/lectures');
	}

	const MdxComponent = getLectureMdxComponent(parsed.data);

	return <MdxComponent />;
};

export default Page;
