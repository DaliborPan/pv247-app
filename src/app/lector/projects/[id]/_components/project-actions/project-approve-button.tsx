'use client';

import { Button } from '@/components/base/button';
import { type Project } from '@/db';

import { confirmProjectAction } from './actions';

export const ProjectApproveButton = ({ project }: { project: Project }) => {
	const iconName = project.status === 'pending' ? 'Check' : 'X';

	return (
		<Button
			size="sm"
			variant="primary/inverse"
			iconLeft={{
				name: iconName
			}}
			onClick={async () => {
				await confirmProjectAction({ project });
			}}
		>
			{project.status !== 'pending' ? 'Disapprove' : 'Approve'}
		</Button>
	);
};
