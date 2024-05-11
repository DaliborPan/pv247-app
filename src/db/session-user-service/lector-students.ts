import { getSessionUser } from '@/auth/session-user';

import { db } from '..';

export const getLectorStudents = async () => {
	const sessionUser = await getSessionUser();

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.id, sessionUser.id),
		with: {
			students: {
				with: {
					homeworksStudent: true
				}
			}
		}
	});

	return user?.students ?? [];
};

export type GetLectorStudentsResult = Awaited<
	ReturnType<typeof getLectorStudents>
>;
