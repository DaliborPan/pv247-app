import { db, type HomeworkSlug } from '@/db';

import { PersonHomeworkDeadline } from './person-homework-deadline';
import { PersonHomeworkPoints } from './person-homework-points';

const LabeledItem = ({
	label,
	children
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="flex flex-col">
		<span className="font-light text-gray-600">{label}</span>
		<span className="-mt-[2px] text-lg font-medium text-primary">
			{children}
		</span>
	</div>
);

export const HomeworkGeneralInfo = async ({ slug }: { slug: HomeworkSlug }) => {
	const lecture = await db.query.lectures.findFirst({
		where: (table, { eq }) => eq(table.homeworkSlug, slug)
	});

	if (!lecture) return null;

	return (
		<div className="grid grid-cols-4 p-4 mt-8 rounded-lg gap-x-10 bg-primary-100">
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
				<LabeledItem label="Earned points">
					<PersonHomeworkPoints lectureId={lecture.id} />
				</LabeledItem>
			</div>
		</div>
	);
};
