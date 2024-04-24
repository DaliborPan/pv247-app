import { type PropsWithChildren } from 'react';

import { type LectureSlug } from '@/db';
import { query } from '@/db/query';

import { NavigationButtonLink } from '../../_components/navigation-button-link';

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: LectureSlug } }>) => {
	const lectures = await query.lectures.getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.slug === params.slug
	);

	const prevLecture = lectures[slugLectureIndex - 1];
	const nextLecture = lectures[slugLectureIndex + 1];

	return (
		<>
			<div className="flex flex-col justify-between gap-2 md:flex-row">
				<div className="w-full md:w-auto">
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

			<main className="max-w-4xl mx-auto -mt-4 lg:-mt-10">{children}</main>
		</>
	);
};

export default Layout;
