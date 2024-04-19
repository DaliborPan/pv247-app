import { type PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { lectureSlugSchema } from '@/db';
import { query } from '@/db/query';

import { NavigationButtonLink } from '../../_components/navigation-button-link';

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: string } }>) => {
	const parsedSlug = lectureSlugSchema.safeParse(params.slug);

	if (!parsedSlug.success) {
		redirect('/lectures');
	}

	const pageParamSlug = parsedSlug.data;

	const lectures = await query.lectures.getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.slug === pageParamSlug
	);

	const prevLecture = lectures[slugLectureIndex - 1];
	const nextLecture = lectures[slugLectureIndex + 1];

	return (
		<>
			<div className="flex flex-col justify-between md:flex-row">
				<div>
					{prevLecture && (
						<NavigationButtonLink
							type="previous"
							href={`/lectures/${prevLecture.slug}`}
							name={prevLecture.name}
						/>
					)}
				</div>

				<div>
					{nextLecture && (
						<NavigationButtonLink
							type="next"
							href={`/lectures/${nextLecture.slug}`}
							name={nextLecture.name}
						/>
					)}
				</div>
			</div>

			<main className="max-w-4xl mx-auto -mt-10">{children}</main>
		</>
	);
};

export default Layout;
