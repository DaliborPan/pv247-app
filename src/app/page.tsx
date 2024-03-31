import { auth } from '@/auth';

import { SignInHero } from './_components/sign-in';

const Page = async () => {
	const session = await auth();

	return session ? (
		<main className="container">
			<h1 className="text-xl">{session?.user.name}</h1>
		</main>
	) : (
		<SignInHero />
	);
};

export default Page;
