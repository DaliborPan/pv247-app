import { auth } from '@/auth';

import { SignInHero } from './_components/sign-in';
import { Sidebar } from './_components/sidebar';

const Page = async () => {
	const session = await auth();

	return session ? (
		<main className="container">
			<Sidebar />

			<div className="pl-[20rem]">
				<h1 className="text-xl">{session?.user.name}</h1>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
				<div className="py-10">blabla blabla</div>
			</div>
		</main>
	) : (
		<SignInHero />
	);
};

export default Page;
