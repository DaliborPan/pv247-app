import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
	<div className="container py-10">{children}</div>
);

export default Layout;
