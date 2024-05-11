import Link from 'next/link';

import { getSessionUser } from '@/auth/session-user';
import { Button } from '@/components/base/button';
import {
	Hero,
	ListCard,
	OverviewCard,
	ProfileCard
} from '@/components/person-detail';
import { LabeledValue } from '@/components/labeled-value';
import { PointsBadge } from '@/components/points-badge';
import { getProjectWithUsers } from '@/db/session-user-service/project';
import { getAvailableLectures } from '@/db/query/lectures';
import { RevalidateLectures } from '@/components/revalidate-lectures';

import { EditProfileForm } from './_components/edit-profile-form';

const ProjectCard = async () => {
	const project = await getProjectWithUsers();

	if (!project) {
		return null;
	}

	return (
		<ProfileCard
			title="Project"
			actions={
				<Link href="/project">
					<Button
						variant="primary/inverse"
						size="sm"
						iconLeft={{
							name: 'ArrowRight'
						}}
					/>
				</Link>
			}
		>
			<div className="flex flex-col gap-y-3">
				<LabeledValue label="Project name">{project.name}</LabeledValue>
				<LabeledValue label="Project description">
					<p className="relative pl-4 mt-2 text-sm font-light leading-6 line-clamp-3">
						<span className="absolute left-0 w-1 h-full bg-primary" />
						{project.description}
					</p>
				</LabeledValue>
			</div>
		</ProfileCard>
	);
};

const HomeworksCard = async () => {
	const user = await getSessionUser();
	const availableLectures = await getAvailableLectures();

	return (
		<ListCard
			items={availableLectures.filter(lecture => !!lecture.homeworkSlug)}
			title="Homework"
			renderItem={(lecture, index) => {
				const homework = lecture.homeworks.find(
					homework => homework.studentId === user.id
				);

				const points = homework?.points ?? null;

				return (
					<>
						<div className="grow">
							<span className="text-xs text-gray-500">
								Homework {index + 1}
							</span>
							<h4 className="-mt-1">{lecture.homeworkName}</h4>
						</div>

						<PointsBadge
							points={points}
							maximumPoints={lecture.homeworkMaxPoints}
						/>

						<Link href={`/homeworks/${lecture.homeworkSlug}`}>
							<Button
								className="ml-4"
								size="sm"
								variant="ghost"
								iconLeft={{
									name: 'ArrowRight'
								}}
							/>
						</Link>
					</>
				);
			}}
		/>
	);
};

const EditProfileAction = async () => {
	const user = await getSessionUser();

	return (
		<EditProfileForm
			defaultValues={{
				id: user.id,
				firstName: user.firstName ?? undefined,
				lastName: user.lastName ?? undefined
			}}
		/>
	);
};

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

const RevalidateLecturesSection = async () => {
	const user = await getSessionUser();

	return user.role === 'lector' ? (
		<div className="mx-6 mt-6">
			<h2 className="mb-4 text-xl">Revalidate lectures</h2>
			<RevalidateLectures />
		</div>
	) : null;
};

const Page = async () => {
	const user = await getSessionUser();

	const isLector = user.role === 'lector';

	return (
		<>
			<Hero actions={<EditProfileAction />}>
				<ProfileHeroContent />
			</Hero>

			{!isLector && (
				<>
					<OverviewCard />
					<HomeworksCard />
					<ProjectCard />
				</>
			)}

			<RevalidateLecturesSection />
		</>
	);
};

export default Page;
