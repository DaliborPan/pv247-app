import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { auth } from '@/auth';
import { db } from '@/db';
import { Icon } from '@/components/base/icon';
import { Button } from '@/components/base/button';
import { Hero } from '@/components/person-detail';

import { ProjectForm } from './_components/project-form';

const ProjectHero = async ({
	projectId,
	projectName
}: {
	projectName: string;
	projectId: string;
}) => {
	const projectUsers = await db.query.users.findMany({
		where: users => eq(users.projectId, projectId)
	});

	const displayUsers = projectUsers
		.map(user => `${user.firstName} ${user.lastName}`)
		.join(', ');

	return (
		<Hero
			actions={
				<Link href="/project/edit">
					<Button
						size="sm"
						variant="outline"
						iconLeft={{
							name: 'Pencil'
						}}
					/>
				</Link>
			}
		>
			<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-500 to-primary-100" />

			<div>
				<div className="text-2xl font-medium text-slate-900">{projectName}</div>
				<div className="flex items-center mt-1 gap-x-2">
					<Icon name="Users" />
					<div className="text-sm text-gray-500">{displayUsers}</div>
				</div>
			</div>
		</Hero>
	);
};

const ProjectCard = async ({ projectId }: { projectId: string }) => {
	const project = await db.query.projects.findFirst({
		where: projects => eq(projects.id, projectId)
	});

	if (!project) return null;

	return (
		<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
			<h3 className="mb-4 text-xl">Description</h3>

			<p className="text-gray-500">{project.description}</p>
		</div>
	);
};

const Page = async () => {
	const session = await auth();

	if (!session?.user) return null;

	const user = await db.query.users.findFirst({
		where: users => eq(users.id, session.user.id ?? ''),
		with: {
			project: true
		}
	});

	return user?.project ? (
		<div>
			<ProjectHero
				projectId={user.project.id}
				projectName={user.project.name}
			/>

			<ProjectCard projectId={user.project.id} />
		</div>
	) : (
		<ProjectForm />
	);
};

export default Page;
