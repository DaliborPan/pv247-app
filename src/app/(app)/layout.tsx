import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { getSessionUser } from '@/auth';

const Layout = async ({ children }: PropsWithChildren) => {
	const user = await getSessionUser();

	return (
		<>
			<Navigation user={user} />

			{children}
		</>
	);
};

export default Layout;
