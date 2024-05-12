import { type HomeworkSlug } from '@/db';
import { getOrderedLectures } from '@/db/query/lectures';

import { PersonHomeworkDeadline } from './person-homework-deadline';
import { LabeledItem } from './labeled-item';
import { HomeworkPoints } from './homework-points';

export const HomeworkGeneralInfo = async ({ slug }: { slug: HomeworkSlug }) => {
	const lectures = await getOrderedLectures();
	const lecture = lectures.find(lecture => lecture.slug === slug);

	if (!lecture) return null;

	return (
		<div className="grid items-center grid-cols-4 p-4 mt-8 rounded-lg gap-x-10 bg-primary-100">
			<div className="grow">
				<LabeledItem label="Maximum points">
					{lecture?.homeworkMaxPoints} points
				</LabeledItem>
			</div>

			<div className="col-span-2">
				<LabeledItem label="Deadline">
					<PersonHomeworkDeadline lecture={lecture} />
				</LabeledItem>
			</div>

			<div>
				<HomeworkPoints lecture={lecture} />
			</div>
		</div>
	);
};
