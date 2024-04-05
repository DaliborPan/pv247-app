import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { auth } from '@/auth';
import { Hero } from '@/components/hero';
import { db } from '@/db';
import { Icon } from '@/components/base/icon';
import { Button } from '@/components/base/button';

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
			<div className="size-20 bg-gradient-to-tr from-primary-500 to-primary-100 rounded-full shadow" />

			<div>
				<div className="text-2xl font-medium text-slate-900">{projectName}</div>
				<div className="flex items-center gap-x-2 mt-1">
					<Icon name="Users" />
					<div className="text-gray-500 text-sm">{displayUsers}</div>
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
		<div className="bg-white shadow-lg rounded-lg p-8 mx-6 mt-8">
			<h3 className="text-xl mb-4">Description</h3>

			<p className="text-gray-500">{project.description}</p>
		</div>
	);
};

const Page = async () => {
	const session = await auth();

	if (!session?.user) return null;

	return session.user.projectId && session.user.projectName ? (
		<div>
			<ProjectHero
				projectId={session.user.projectId}
				projectName={session.user.projectName}
			/>

			<ProjectCard projectId={session.user.projectId} />
		</div>
	) : (
		<ProjectForm />
	);
};

export default Page;
