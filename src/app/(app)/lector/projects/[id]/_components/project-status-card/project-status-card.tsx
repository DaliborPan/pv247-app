import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { type Project } from '@/db';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';

import { SetProjectPointsForm } from './set-project-points-form';
import { ProjectApproveButton } from './project-approve-button';

export const ProjectStatusCard = ({ project }: { project: Project }) => {
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
