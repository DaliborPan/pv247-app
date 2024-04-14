import Link from 'next/link';

import { getSessionUser } from '@/auth';
import { query } from '@/db/query';
import { Button } from '@/components/base/button';
import {
	Hero,
	ListCard,
	OverviewCard,
	ProfileCard
} from '@/components/person-detail';
import { db } from '@/db';
import { LabeledValue } from '@/components/labeled-value';

import { EditProfileForm } from './_components/edit-profile-form';

const ProjectCard = async () => {
	const user = await getSessionUser();

	const project = await db.query.projects.findFirst({
		where: (project, { eq }) => eq(project.id, user.projectId ?? '')
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

const AttendanceCard = () => (
	<ProfileCard title="Attendance">
		<div>TBA</div>
	</ProfileCard>
);

const HomeworksCard = async () => {
	const availableLectures = await query.lectures.getAvailableLectures();

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

const Page = async () => {
	const user = await getSessionUser();

	const displayName =
		user.firstName && user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.name;

	const displayRole =
		user.role === 'student' ? 'Course Student' : 'Course Teacher';

	return (
		<>
			<Hero actions={<EditProfileForm userId={user.id} />}>
				<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
				<div>
					<div className="text-2xl font-medium text-slate-900">
						{displayName}
					</div>
					<div className="text-sm text-gray-500">{displayRole}</div>
				</div>
			</Hero>

			<OverviewCard userId={user.id} />

			<HomeworksCard />

			<AttendanceCard />

			<ProjectCard />
		</>
	);
};

export default Page;
