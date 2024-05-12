import { eq } from 'drizzle-orm';

import { db } from '..';

export const getStudentsWithHomeworks = () =>
	db.query.users.findMany({
		where: users => eq(users.role, 'student'),
		with: {
			homeworksStudent: true
		}
	});

export type GetStudentsWithHomeworksResult = Awaited<
	ReturnType<typeof getStudentsWithHomeworks>
>;

export const getStudent = (id: string) =>
	db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, id)
	});

export type GetStudent = Awaited<ReturnType<typeof getStudent>>;
