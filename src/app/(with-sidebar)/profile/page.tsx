import { auth } from '@/auth';
import { query } from '@/db/query';
import { Button } from '@/components/base/button';

import { EditProfileForm } from './_components/edit-profile-form';

const HomeworksCard = async () => {
	const availableLectures = await query.getAvailableLectures();

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mx-6 mt-8">
			<h3 className="text-xl mb-4">Homeworks</h3>

			<div className="flex flex-col gap-y-2">
				{availableLectures.map((lecture, index) => (
					<div
						key={lecture.slug}
						className="bg-primary-100 p-4 rounded-md flex items-center"
					>
						<div className="grow">
							<span className="text-xs text-gray-500">
								Homework {index + 1}
							</span>
							<h4 className="-mt-1">{lecture.homeworkName}</h4>
						</div>

						<Button
							size="sm"
							variant="outline"
							iconLeft={{
								name: 'ArrowRight'
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

const Page = async () => {
	const session = await auth();

	if (!session) return null;

	const displayName =
		session.user.firstName && session.user.lastName
			? `${session.user.firstName} ${session.user.lastName}`
			: session.user.name;

	const displayRole =
		session.user.role === 'student' ? 'Course Student' : 'Course Teacher';

	return (
		<>
			<div className="bg-gradient-to-tr from-primary-100 to-primary rounded-lg py-28" />

			<div className="flex mx-6 -mt-20 bg-white shadow-lg rounded-lg p-8">
				<div className="flex items-center gap-x-6 grow">
					<div className="size-20 bg-gradient-to-tr from-primary-100 to-primary-300 rounded-full shadow" />
					<div>
						<div className="text-2xl font-medium text-slate-900">
							{displayName}
						</div>
						<div className="text-gray-500 text-sm">{displayRole}</div>
					</div>
				</div>

				<EditProfileForm userId={session.user.id} />
			</div>

			<HomeworksCard />
		</>
	);
};

export default Page;
