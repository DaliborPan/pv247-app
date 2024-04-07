// TODO: only role teacher can access. Redirect otherwise

import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { auth } from '@/auth';

const Layout = async ({ children }: PropsWithChildren<object>) => {
	const session = await auth();
	const role = session?.user?.role;

	if (role !== 'lector') {
		return redirect('/');
	}

	return <div className="container">{children}</div>;
};

export default Layout;
