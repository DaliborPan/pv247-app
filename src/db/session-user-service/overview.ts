import { cache } from 'react';

import { getSessionUser } from '@/auth/session-user';

import { getUserOverview } from '../query/overview';

export const getSessionUserOverview = cache(async () => {
	const sessionUser = await getSessionUser();

	return getUserOverview({
		userId: sessionUser.id,
		projectId: sessionUser.projectId ?? undefined
	});
});
