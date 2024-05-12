import { redirect } from 'next/navigation';

import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';
import { getProject, type GetProjectResult } from '@/db/query/project';

import { ProjectStatusCard } from './_components/project-status-card';

const ProjectUsersCard = ({
	project
}: {
	project: NonNullable<GetProjectResult>;
}) => (
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
);

const Page = async ({ params: { id } }: { params: { id: string } }) => {
	const project = await getProject(id);

	if (!project) {
		redirect('/lector/projects');
	}

	return (
		<div className="flex flex-col-reverse gap-y-8 md:gap-y-0 md:flex-row">
			<div className="md:w-2/3 w-full">
				<h1 className="mb-6 text-3xl">{project.name}</h1>
				<p>{project.description}</p>
			</div>

			<aside className="flex flex-col md:w-1/3 w-full gap-y-6">
				<ProjectStatusCard project={project} />
				<ProjectUsersCard project={project} />
			</aside>
		</div>
	);
};

export default Page;
