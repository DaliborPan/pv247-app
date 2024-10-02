import { cache } from 'react';

import { auth } from './auth';

export const getSessionUser = cache(async () => {
	const session = await auth();

	console.log(session);

	if (!session?.user) {
		throw new Error(
			'getSessionUser must be called from authenticated pages/components only!'
		);
	}

	return session.user;
});
