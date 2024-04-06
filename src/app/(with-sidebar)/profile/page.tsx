import Link from 'next/link';

import { auth } from '@/auth';
import { query } from '@/db/query';
import { Button } from '@/components/base/button';
import { Hero } from '@/components/hero';
import { db } from '@/db';

import { EditProfileForm } from './_components/edit-profile-form';

const ProjectCard = async () => {
	const session = await auth();

	if (!session?.user) return null;

	const project = await db.query.projects.findFirst({
		where: (project, { eq }) => eq(project.id, session.user.projectId ?? '')
	});

	if (!project) return null;

	return (
		<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
			<div className="flex items-center">
				<h3 className="mb-4 text-xl grow">Project</h3>
				<Link href="/project">
					<Button
						variant="primary/inverse"
						size="sm"
						iconLeft={{
							name: 'ArrowRight'
						}}
					/>
				</Link>
			</div>

			<div className="flex flex-col gap-y-2">
				<div>
					<span className="text-xs text-gray-500">Project name</span>
					<h4 className="-mt-1">{project.name}</h4>
				</div>

				<div>
					<span className="text-xs text-gray-500">Project description</span>
					<p className="line-clamp-2">{project.description}</p>
				</div>
			</div>
		</div>
	);
};

const AttendanceCard = () => (
	<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
		<h3 className="mb-4 text-xl">Attendance</h3>

		<div>TBA</div>
	</div>
);

const HomeworksCard = async () => {
	const availableLectures = await query.getAvailableLectures();

	return (
		<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
			<h3 className="mb-4 text-xl">Homeworks</h3>

			<div className="flex flex-col gap-y-2">
				{availableLectures.map((lecture, index) => (
					<div
						key={lecture.slug}
						className="flex items-center p-4 rounded-md bg-primary-100"
					>
						<div className="grow">
							<span className="text-xs text-gray-500">
								Homework {index + 1}
							</span>
							<h4 className="-mt-1">{lecture.homeworkName}</h4>
						</div>

						<Button
							size="sm"
							variant="primary/inverse"
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
			<Hero actions={<EditProfileForm userId={session.user.id} />}>
				<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-100 to-primary-300" />
				<div>
					<div className="text-2xl font-medium text-slate-900">
						{displayName}
					</div>
					<div className="text-sm text-gray-500">{displayRole}</div>
				</div>
			</Hero>

			<HomeworksCard />

			<AttendanceCard />

			<ProjectCard />
		</>
	);
};

export default Page;
