import { db } from '..';

export const getUserHomeworks = (userId: string) =>
	db.query.homeworks.findMany({
		where: (table, { eq }) => eq(table.studentId, userId)
	});

export type GetUserHomeworksResult = Awaited<
	ReturnType<typeof getUserHomeworks>
>;
