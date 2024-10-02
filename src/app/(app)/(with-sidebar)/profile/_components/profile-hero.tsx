import { Hero } from '@/components/person-detail';
import { getSessionUser } from '@/auth/session-user';

import { EditProfileForm } from './edit-profile-form';

const ProfileHeroContent = async () => {
	const user = await getSessionUser();

	const displayName =
		user.firstName && user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.name;

	const displayRole =
		user.role === 'student' ? 'Course Student' : 'Course Teacher';

	return (
		<>
			<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />

			<div>
				<div className="text-2xl font-medium text-slate-900">{displayName}</div>
				<div className="text-sm text-gray-500">{displayRole}</div>
			</div>
		</>
	);
};

const EditProfileAction = async () => {
	const user = await getSessionUser();

	return (
		<EditProfileForm
			defaultValues={{
				id: user.id,
				firstName: user.firstName ?? undefined,
				lastName: user.lastName ?? undefined,
				github: user.github ?? undefined
			}}
		/>
	);
};

export const ProfileHero = () => (
	<Hero actions={<EditProfileAction />}>
		<ProfileHeroContent />
	</Hero>
);
