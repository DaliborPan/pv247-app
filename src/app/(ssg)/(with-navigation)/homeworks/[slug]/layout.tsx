import { type PropsWithChildren } from 'react';

import { type HomeworkSlug } from '@/db';
import { NavigationButtonLink } from '@/components/navigation-button-link';
import { getOrderedLectures } from '@/modules/lecture/server';

const getLecturesWithHomework = async () => {
	const lectures = await getOrderedLectures();

	return lectures.filter(lecture => !!lecture.homeworkSlug);
};

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { slug: HomeworkSlug } }>) => {
	const lectures = await getLecturesWithHomework();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.homeworkSlug === params.slug
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
