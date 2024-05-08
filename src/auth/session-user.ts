import { cache } from 'react';

import { type User } from '@/db';

import { auth } from './auth';

export const getSessionUser = cache(async () => {
	console.log('calling for user');

	const session = await auth();

	if (!session?.user) {
		throw new Error(
			'getSessionUser must be called from authenticated pages/components only!'
		);
	}

	return JSON.parse(JSON.stringify(session.user)) as User;
});
