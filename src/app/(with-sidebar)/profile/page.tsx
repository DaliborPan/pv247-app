import { auth } from '@/auth';

import { EditProfileForm } from './_components/edit-profile-form';

const Page = async () => {
	const session = await auth();

	if (!session) return null;

	return (
		<>
			<h1>Profile</h1>
			<p>
				{session.user.firstName} {session.user.lastName}
			</p>

			<EditProfileForm userId={session.user.id} />
		</>
	);
};

export default Page;
