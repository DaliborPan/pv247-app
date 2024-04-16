'use client';

import { useSession } from 'next-auth/react';
import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';

/**
 * We need to get user client side here in order to generate lectures statically
 */
const LecturesNavigation = () => {
	const session = useSession();

	return (
		<Navigation
			user={session.data?.user}
			isUserLoading={session.status === 'loading'}
		/>
	);
};

const Layout = ({ children }: PropsWithChildren) => (
	<>
		<LecturesNavigation />

		<div className="container mb-10">{children}</div>
	</>
);

export default Layout;
