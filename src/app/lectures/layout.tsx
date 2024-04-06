import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
	<div className="container">{children}</div>
);

export default Layout;
