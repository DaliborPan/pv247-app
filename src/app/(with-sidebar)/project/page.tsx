import { eq } from 'drizzle-orm';
import Link from 'next/link';

import { auth } from '@/auth';
import { db, type Project, type User } from '@/db';
import { Icon } from '@/components/base/icon';
import { Button } from '@/components/base/button';
import { Hero } from '@/components/person-detail';
import { cn } from '@/lib/cn';

import { ProjectForm } from './_components/project-form';
import { SubmitProjectButton } from './_components/submit-project';

const ProjectHero = async ({
	project,
	users
}: {
	project: Project;
	users: User[];
}) => {
	const displayUsers = users
		.map(user => `${user.firstName} ${user.lastName}`)
		.join(', ');

	const isEditDisabled = project.status === 'submitted';

	return (
		<Hero
			actions={
				<>
					<a
						href={project.github ?? ''}
						target="_blank"
						rel="noreferrer"
						className={cn(!project.github && 'pointer-events-none')}
					>
						<Button
							size="sm"
							variant="outline"
							iconLeft={{
								name: 'Github'
							}}
							disabled={!project.github}
						/>
					</a>

					<Link
						href="/project/edit"
						className={cn(isEditDisabled && 'pointer-events-none')}
					>
						<Button
							disabled={isEditDisabled}
							size="sm"
							variant="outline"
							iconLeft={{
								name: 'Pencil'
							}}
						/>
					</Link>
				</>
			}
		>
			<div className="rounded-full shadow size-20 bg-gradient-to-tr from-primary-500 to-primary-100" />

			<div>
				<div className="text-2xl font-medium text-slate-900">
					{project.name}
				</div>
				<div className="flex items-center mt-1 gap-x-2">
					<Icon name="Users" />
					<div className="text-sm text-gray-500">{displayUsers}</div>
				</div>
			</div>
		</Hero>
	);
};

const ProjectCard = async ({ project }: { project: Project }) => (
	<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
		<h3 className="mb-4 text-xl">Description</h3>

		<p className="text-gray-500">{project.description}</p>
	</div>
);

const SubmitProjectCard = ({ project }: { project: Project }) => (
	<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
		<div className="flex items-center mb-4 gap-x-2">
			<h3 className="text-xl grow">Ready to submit your project?</h3>

			{!project.github && (
				<Link href="/project/edit">
					<Button
						size="sm"
						variant="outline/primary"
						iconLeft={{
							name: 'Pencil'
						}}
					>
						Set github link
					</Button>
				</Link>
			)}
		</div>

		{project.github ? (
			<SubmitProjectButton project={project} />
		) : (
			<p className="text-sm text-gray-600">
				You need to set github link first.
			</p>
		)}
	</div>
);

const Page = async () => {
	const session = await auth();

	if (!session?.user) return null;

	const user = await db.query.users.findFirst({
		where: users => eq(users.id, session.user.id ?? ''),
		with: {
			project: {
				with: {
					users: true
				}
			}
		}
	});

	return user?.project ? (
		<div>
			<ProjectHero project={user.project} users={user.project.users} />
			<ProjectCard project={user.project} />
			{user.project.status !== 'pending' && (
				<SubmitProjectCard project={user.project} />
			)}
		</div>
	) : (
		<ProjectForm />
	);
};

export default Page;
