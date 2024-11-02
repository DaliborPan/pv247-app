'use client';

import { useSession } from 'next-auth/react';
import { type PropsWithChildren } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { Navigation } from '@/components/navigation';

type Page = '/homeworks' | '/lectures';

const pageTitleMap: Record<Page, string> = {
	'/homeworks': 'Homeworks',
	'/lectures': 'Lectures'
};

/**
 * We need to get user client-side here in order to generate lectures statically
 */
const PublicNavigation = () => {
	const session = useSession();

	return (
		<Navigation
			user={session.data?.user}
			isUserLoading={session.status === 'loading'}
		/>
	);
};

const Layout = ({ children }: PropsWithChildren) => {
	const pathname = usePathname() as Page;
	const params = useParams();

	return (
		<>
			<PublicNavigation />

			<div className="container my-8">
				{!params.slug ? (
					<>
						<h1 className="mb-6 text-3xl">{pageTitleMap[pathname]}</h1>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{children}
						</div>
					</>
				) : (
					children
				)}
			</div>
		</>
	);
};

export default Layout;
