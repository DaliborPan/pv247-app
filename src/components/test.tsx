import { auth } from '@/auth';

export const Test = async () => {
	const session = await auth();

	return (
		<div className="py-10">
			<h2 className="text-2xl text-blue-500">
				test component - {session?.user.name}
			</h2>
		</div>
	);
};
