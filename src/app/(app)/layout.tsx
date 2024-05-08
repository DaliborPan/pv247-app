import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { getSessionUser } from '@/auth/session-user';

const Layout = async ({ children }: PropsWithChildren) => {
	const user = await getSessionUser();

	return (
		<>
			<Navigation user={user} />

			<div className="my-8">{children}</div>
		</>
	);
};

export default Layout;
