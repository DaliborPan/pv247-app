import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';

import { getProject } from '../query/project';

export const getProjectWithUsers = cache(async () => {
	const user = await getSessionUser();
	const userProjectId = user.projectId;

	if (!userProjectId) {
		return undefined;
	}

	return getProject(userProjectId);
});

export type GetProjectWithUsersResult = Awaited<
	ReturnType<typeof getProjectWithUsers>
>;
