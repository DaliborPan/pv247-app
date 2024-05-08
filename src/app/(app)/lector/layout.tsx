import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { getSessionUser } from '@/auth/session-user';

import { SubNavigation } from './_components/sub-navigation';

const Layout = async ({ children }: PropsWithChildren<object>) => {
	const user = await getSessionUser();

	if (user.role !== 'lector') {
		return redirect('/');
	}

	return (
		<div className="-mt-8">
			<SubNavigation />

			<main className="container mt-8">{children}</main>
		</div>
	);
};

export default Layout;
