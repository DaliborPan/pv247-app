'use client';

import { Check } from 'lucide-react';

import { type Project } from '@/db';
import { Button } from '@/components/base/button';

import { useSubmitProjectMutation } from './mutation';

export const SubmitProjectButton = ({ project }: { project: Project }) => {
	const mutation = useSubmitProjectMutation(project);

	return (
		<Button
			disabled={project.status === 'submitted'}
			isLoading={mutation.isPending}
			size="sm"
			iconLeft={{ icon: <Check /> }}
			onClick={() => mutation.mutate()}
		>
			{project.status === 'submitted' ? 'Submitted' : 'Submit project'}
		</Button>
	);
};
