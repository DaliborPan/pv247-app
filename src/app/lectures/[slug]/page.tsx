import { redirect } from 'next/navigation';

import { type LectureSlug, lectureSlugSchema } from '@/schema/lecture';

import Introduction from './_components/introduction.mdx';

const slugMap: Record<
	LectureSlug,
	(props: { readonly components?: object | undefined }) => JSX.Element
> = {
	introduction: Introduction,
	react: () => <div>React</div>
};

const Page = ({ params }: { params: { slug: string } }) => {
	const parsed = lectureSlugSchema.safeParse(params.slug);

	if (!parsed.success) {
		redirect('/lectures');
	}

	const Component = slugMap[parsed.data];

	return <Component />;
};

export default Page;
