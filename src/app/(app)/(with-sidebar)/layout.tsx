import { type PropsWithChildren } from 'react';

import { Sidebar } from './_components/sidebar';

const Layout = ({ children }: PropsWithChildren) => (
	<div className="container pb-8">
		<Sidebar />

		<div className="lg:pl-[20rem] pt-10 lg:pt-0">{children}</div>
	</div>
);

export default Layout;
