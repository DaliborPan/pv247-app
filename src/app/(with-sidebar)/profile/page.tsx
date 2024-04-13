import Link from 'next/link';

import { auth } from '@/auth';
import { query } from '@/db/query';
import { Button } from '@/components/base/button';
import { Hero, ListCard, ProfileCard } from '@/components/person-detail';
import { db } from '@/db';
import { LabeledValue } from '@/components/labeled-value';
import { getOverview } from '@/db/service/overview';

import { EditProfileForm } from './_components/edit-profile-form';

const ProjectCard = async () => {
	const session = await auth();

	if (!session?.user) return null;

	const project = await db.query.projects.findFirst({
		where: (project, { eq }) => eq(project.id, session.user.projectId ?? '')
	});

	if (!project) return null;

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
				<LabeledValue
					label="Project description"
					valueClassName="text-sm font-light leading-6 line-clamp-3 mt-2 pl-4 relative"
				>
					<span className="absolute left-0 w-1 h-full bg-primary" />

					{project.description}
				</LabeledValue>
			</div>
		</ProfileCard>
	);
};

const AttendanceCard = () => (
	<ProfileCard title="Attendance">
		<div>TBA</div>
	</ProfileCard>
);

const HomeworksCard = async () => {
	const availableLectures = await query.getAvailableLectures();

	return (
		<ListCard
			items={availableLectures}
			title="Homeworks"
			renderItem={(lecture, index) => (
				<>
					<div className="grow">
						<span className="text-xs text-gray-500">Homework {index}</span>
						<h4 className="-mt-1">{lecture.homeworkName}</h4>
					</div>

					<Button
						size="sm"
						variant="primary/inverse"
						iconLeft={{
							name: 'ArrowRight'
						}}
					/>
				</>
			)}
		/>
	);
};

const OverviewCard = async ({ userId }: { userId: string }) => {
	const { homeworks, project, totalPoints } = await getOverview(userId);

	return (
		<ProfileCard title="Overview">
			<div className="grid grid-cols-3">
				<LabeledValue label="Homework points">
					{homeworks.totalPoints} points
				</LabeledValue>
				<LabeledValue label="Project points">
					{project.project?.points
						? `${project.project.points} points`
						: 'No points yet'}
				</LabeledValue>
				<LabeledValue label="Total points">{totalPoints} points</LabeledValue>
			</div>
		</ProfileCard>
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
			<Hero actions={<EditProfileForm userId={session.user.id} />}>
				<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
				<div>
					<div className="text-2xl font-medium text-slate-900">
						{displayName}
					</div>
					<div className="text-sm text-gray-500">{displayRole}</div>
				</div>
			</Hero>

			<OverviewCard userId={session.user.id} />

			<HomeworksCard />

			<AttendanceCard />

			<ProjectCard />
		</>
	);
};

export default Page;
