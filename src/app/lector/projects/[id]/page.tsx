import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db, type Project } from '@/db';
import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';

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
				<h3 className="truncate text-sm mb-4">
					{status === 'approved'
						? 'Approved!'
						: status === 'pending'
							? 'This project has not been approved yet.'
							: 'Submitted!'}
				</h3>
			}
		>
			{hasPoints && (
				<p className="text-primary font-medium">Points: {project.points}</p>
			)}

			{status === 'submitted' ? (
				<SetProjectPointsForm projectId={project.id} points={project.points} />
			) : (
				<ProjectApproveButton project={project} />
			)}
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
				<h1 className="text-3xl mb-6">{project.name}</h1>
				<p>{project.description}</p>
			</div>

			<aside className="w-1/3 flex flex-col gap-y-6">
				<ProjectStatusCard project={project} />

				<SidebarCard title="Users">
					<ul className="text-primary font-medium flex flex-col gap-y-1.5">
						{project.users.map(user => (
							<li key={user.id} className="flex gap-x-2 items-center">
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
