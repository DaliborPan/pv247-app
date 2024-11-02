'use client';

import { Check, X } from 'lucide-react';

import { Button } from '@/components/base/button';
import { type Project } from '@/db';

import { confirmProjectAction } from './actions';

export const ProjectApproveButton = ({ project }: { project: Project }) => {
	const StatusIcon = project.status === 'pending' ? Check : X;

	return (
		<Button
			size="sm"
			variant="primary/inverse"
			iconLeft={{ icon: <StatusIcon /> }}
			onClick={async () => {
				await confirmProjectAction({ project });
			}}
		>
			{project.status !== 'pending' ? 'Disapprove' : 'Approve'}
		</Button>
	);
};
