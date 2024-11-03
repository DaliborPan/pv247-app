import { and, eq } from 'drizzle-orm';

import { db, homeworks, type HomeworkInsert } from '@/db';

export const createHomework = (data: HomeworkInsert) =>
	db.insert(homeworks).values(data);

export const updateHomeworkPoints = ({
	points,
	lectureId,
	studentId
}: {
	points: number;
	lectureId: string;
	studentId: string;
}) =>
	db
		.update(homeworks)
		.set({
			points
		})
		.where(
			and(
				eq(homeworks.lectureId, lectureId),
				eq(homeworks.studentId, studentId)
			)
		);
