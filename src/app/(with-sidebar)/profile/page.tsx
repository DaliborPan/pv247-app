import { auth } from '@/auth';

const Page = async () => {
	const session = await auth();

	return (
		<>
			<h1>Profile</h1>
			<p>{session?.user.name}</p>
		</>
	);
};

export default Page;
