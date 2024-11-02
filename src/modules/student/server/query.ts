import { db } from '@/db';

/**
 * Get all students with their homeworks
 */
export const getStudentsWithHomeworks = () =>
	db.query.users.findMany({
		where: (users, { eq }) => eq(users.role, 'student'),
		with: {
			homeworksStudent: true
		}
	});

export type GetStudentsWithHomeworksResult = Awaited<
	ReturnType<typeof getStudentsWithHomeworks>
>;

/**
 * Get student by id
 */
export const getStudent = (id: string) =>
	db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, id)
	});

export type GetStudent = Awaited<ReturnType<typeof getStudent>>;
