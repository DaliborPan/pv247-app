import { type HomeworkSlug } from '@/db';
import { getOrderedLectures } from '@/db/query/lectures';

import { HomeworkNavigationLink } from './homework-navigation-link';

export const HomeworksNavigation = async ({
	homeworkSlug
}: {
	homeworkSlug: HomeworkSlug;
}) => {
	const lectures = await getOrderedLectures();

	const slugLectureIndex = lectures.findIndex(
		lecture => lecture.homeworkSlug === homeworkSlug
	);

	const prevLecture = lectures[slugLectureIndex - 1];
	const nextLecture = lectures[slugLectureIndex + 1];

	return (
		<div className="flex gap-x-4">
			{prevLecture && (
				<HomeworkNavigationLink type="previous" lecture={prevLecture} />
			)}

			{nextLecture && (
				<HomeworkNavigationLink type="next" lecture={nextLecture} />
			)}
		</div>
	);
};
