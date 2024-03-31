import { auth } from '@/auth';

import { SignInHero } from './_components';

const Page = async () => {
	const session = await auth();

	return session ? (
		<h1 className="text-xl">{JSON.stringify(session?.user)}</h1>
	) : (
		<SignInHero />
	);
};

export default Page;
