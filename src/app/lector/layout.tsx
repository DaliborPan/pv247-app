// TODO: only role teacher can access. Redirect otherwise

import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { auth } from '@/auth';

import { SubNavigation } from './_components/sub-navigation';

const Layout = async ({ children }: PropsWithChildren<object>) => {
	const session = await auth();
	const role = session?.user?.role;

	if (role !== 'lector') {
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
