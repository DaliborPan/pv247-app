import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db, type Project } from '@/db';
import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';
import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';

import {
	ProjectApproveButton,
	SetProjectPointsForm
} from './_components/project-actions';

const ProjectStatusCard = ({ project }: { project: Project }) => {
	const status = project.status;
	const hasPoints = !!project.points;

	return (
		<SidebarCard
			customTitle={
				<div className="flex items-center mb-2 gap-x-2">
					<h3
						className={cn(
							'truncate grow',
							project.status === 'pending' ? 'text-sm' : 'text-lg'
						)}
					>
						{status === 'approved'
							? 'Approved!'
							: status === 'pending'
								? 'This project has not been approved yet.'
								: 'Project submitted!'}
					</h3>

					{status === 'submitted' && (
						<a href={project.github ?? ''} target="_blank" rel="noreferrer">
							<Button
								size="sm"
								variant="outline/primary"
								iconLeft={{
									name: 'Github'
								}}
								disabled={!project.github}
							/>
						</a>
					)}
				</div>
			}
		>
			{hasPoints && (
				<div className="mt-4">
					<SetProjectPointsForm
						projectId={project.id}
						defaultValues={{
							points: project.points ?? undefined,
							comment: project.comment ?? undefined
						}}
					>
						<button className="flex items-center w-full px-4 py-2 bg-white rounded-md shadow hover:bg-background">
							<span className="font-medium text-left grow text-primary">
								{project.points} points
							</span>

							<Icon name="Pencil" />
						</button>
					</SetProjectPointsForm>

					<div className="mt-4 mb-2">Comment</div>

					<p className="text-sm text-gray-600">{project.comment}</p>
				</div>
			)}

			{status === 'submitted' && !hasPoints && (
				<SetProjectPointsForm projectId={project.id}>
					<Button
						size="sm"
						iconLeft={{
							name: 'SquareArrowOutUpRight'
						}}
					>
						Set points
					</Button>
				</SetProjectPointsForm>
			)}

			{status !== 'submitted' && <ProjectApproveButton project={project} />}
		</SidebarCard>
	);
};

type Params = {
	id: string;
};

const Page = async ({ params }: { params: Params }) => {
	const { id } = params;

	const project = await db.query.projects.findFirst({
		where: project => eq(project.id, id),
		with: {
			users: true
		}
	});

	if (!project) {
		redirect('/lector/projects');
	}

	return (
		<div className="flex">
			<div className="w-2/3">
				<h1 className="mb-6 text-3xl">{project.name}</h1>
				<p>{project.description}</p>
			</div>

			<aside className="flex flex-col w-1/3 gap-y-6">
				<ProjectStatusCard project={project} />

				<SidebarCard title="Users">
					<ul className="text-primary font-medium flex flex-col gap-y-1.5">
						{project.users.map(user => (
							<li key={user.id} className="flex items-center gap-x-2">
								<Icon name="User" />
								<span>{user.name}</span>
							</li>
						))}
					</ul>
				</SidebarCard>
			</aside>
		</div>
	);
};

export default Page;
