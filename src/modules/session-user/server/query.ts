import { cache } from 'react';

import { db } from '@/db';
import { getProject } from '@/modules/project/server';
import { getUserOverview } from '@/modules/shared/server/overview';

import { getSessionUser } from './session-user';

/**
 * As a logged in lector, get all students that are assigned to me.
 */
export const getMineStudents = async () => {
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

export type GetMineStudentsResult = Awaited<ReturnType<typeof getMineStudents>>;

/**
 * Get mine project
 *
 * @cache React cache
 */
export const getMineProject = cache(async () => {
	const user = await getSessionUser();
	const userProjectId = user.projectId;

	if (!userProjectId) {
		return undefined;
	}

	return getProject(userProjectId);
});

export type GetMineProjectResult = Awaited<ReturnType<typeof getMineProject>>;

/**
 * Get mine overview
 *
 * @cache React cache
 */
export const getMineOverview = cache(async () => {
	const sessionUser = await getSessionUser();

	return getUserOverview(sessionUser.id, sessionUser.projectId);
});
