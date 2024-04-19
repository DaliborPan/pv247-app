import { type PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { homeworkSlugSchema } from '@/db';
import { query } from '@/db/query';

import { NavigationButtonLink } from '../../_components/navigation-button-link';

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: string } }>) => {
	const parsedSlug = homeworkSlugSchema.safeParse(params.slug);

	if (!parsedSlug.success) {
		redirect('/homeworks');
	}

	const pageParamSlug = parsedSlug.data;

	const lectures = await query.lectures.getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.homeworkSlug === pageParamSlug
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
							href={`/homeworks/${prevLecture.homeworkSlug}`}
							name={prevLecture.homeworkName}
						/>
					)}
				</div>

				<div>
					{nextLecture && (
						<NavigationButtonLink
							type="next"
							href={`/homeworks/${nextLecture.homeworkSlug}`}
							name={nextLecture.homeworkName}
						/>
					)}
				</div>
			</div>

			<main className="max-w-4xl mx-auto -mt-10">{children}</main>
		</>
	);
};

export default Layout;
