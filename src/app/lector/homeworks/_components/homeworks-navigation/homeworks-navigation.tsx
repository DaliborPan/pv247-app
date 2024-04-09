import { query } from '@/db/query';
import { type HomeworkSlug } from '@/schema/homework';

import { HomeworkNavigationLink } from './homework-navigation-link';

export const HomeworksNavigation = async ({
	homeworkSlug
}: {
	homeworkSlug: HomeworkSlug;
}) => {
	const lectures = await query.getOrderedLectures();

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
