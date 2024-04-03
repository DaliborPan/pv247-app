import { type PropsWithChildren } from 'react';

import { Sidebar } from './_components/sidebar';

const Layout = ({ children }: PropsWithChildren) => (
	<div className="container">
		<Sidebar />

		<div className="pl-[20rem]">{children}</div>
	</div>
);

export default Layout;
