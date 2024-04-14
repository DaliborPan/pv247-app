import { eq } from 'drizzle-orm';

import { db } from '..';

export const getStudentsWithHomeworks = () =>
	db.query.users.findMany({
		where: users => eq(users.role, 'student'),
		with: {
			homeworksStudent: true
		}
	});

export type GetStudentWithHomeworksResult = Awaited<
	ReturnType<typeof getStudentsWithHomeworks>
>;
