import { type PropsWithChildren } from 'react';

import { Sidebar } from './_components/sidebar';

const Layout = ({ children }: PropsWithChildren) => (
	<div className="container pb-8">
		<Sidebar />

		<div className="pl-[20rem]">{children}</div>
	</div>
);

export default Layout;