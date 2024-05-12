import Link from 'next/link';

import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { getSessionUserProject } from '@/db/session-user-service/project';
import { Icon } from '@/components/base/icon';

export const ProjectCard = async () => {
	const project = await getSessionUserProject();

	return (
		<SidebarCard
			customTitle={
				<div className="flex items-center mb-4">
					<h3 className="text-xl grow">Project</h3>

					<Link href="/project">
						<Button
							variant="primary/inverse"
							size="sm"
							iconLeft={{
								name: project?.name ? 'ArrowRight' : 'Plus'
							}}
						/>
					</Link>
				</div>
			}
		>
			{project?.name ? (
				<div className="flex flex-col gap-y-2">
					<span className="text-sm font-medium text-primary">
						{project.name}
					</span>

					<div className="flex items-center text-sm text-gray-600">
						{/* TODO: Icon based on if project is accepted or not */}
						<Icon name="Users" className="mr-2" />
						<span className="truncate">{project.users.length} students</span>
					</div>
				</div>
			) : (
				<span className="text-sm text-gray-600">
					Project not submitted yet.
				</span>
			)}
		</SidebarCard>
	);
};
