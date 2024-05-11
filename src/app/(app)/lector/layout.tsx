import { type PropsWithChildren } from 'react';

import { SubNavigation } from './_components/sub-navigation';

const Layout = async ({ children }: PropsWithChildren) => (
	<div className="-mt-8">
		<SubNavigation />

		<main className="container mt-8">{children}</main>
	</div>
);

export default Layout;
