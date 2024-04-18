import { db, type HomeworkSlug } from '@/db';

import { PersonHomeworkDeadline } from './person-homework-deadline';

export const HomeworkGeneralInfo = async ({ slug }: { slug: HomeworkSlug }) => {
	const lecture = await db.query.lectures.findFirst({
		where: (table, { eq }) => eq(table.homeworkSlug, slug)
	});

	return (
		<div className="flex gap-x-10 bg-primary text-white">
			<div>Points: {lecture?.homeworkMaxPoints}</div>
			<div>Deadline</div>
			<div>{slug}</div>

			{lecture && <PersonHomeworkDeadline lecture={lecture} />}
		</div>
	);
};
