import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/auth/session-user';

export const getProjectWithUsers = cache(async () => {
	const user = await getSessionUser();

	return await db.query.projects.findFirst({
		where: (project, { eq }) => eq(project.id, user.projectId ?? ''),
		with: {
			users: true
		}
	});
});
