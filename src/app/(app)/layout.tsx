import { type PropsWithChildren } from 'react';

import { auth } from '@/auth';
import { Navigation } from '@/components/navigation';

const Layout = async ({ children }: PropsWithChildren) => {
	// TODO(auth)
	const session = await auth();

	return (
		<>
			<Navigation user={session!.user} />

			{children}
		</>
	);
};

export default Layout;
