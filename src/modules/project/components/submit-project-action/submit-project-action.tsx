'use client';

import { Check } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { type Project } from '@/db';
import { Button } from '@/components/base/button';

import { useSubmitProjectMutation } from './mutation';

export const SubmitProjectAction = ({ project }: { project: Project }) => {
	const mutation = useSubmitProjectMutation();

	return (
		<Button
			disabled={project.status === 'submitted'}
			isLoading={mutation.isPending}
			size="sm"
			iconLeft={{ icon: <Check /> }}
			onClick={() =>
				mutation.mutate(
					{ project },
					{
						onSuccess: () => {
							toast.success('Project submitted!');
						},
						onError: () => {
							toast.error('Failed to submit project');
						}
					}
				)
			}
		>
			{project.status === 'submitted' ? 'Submitted' : 'Submit project'}
		</Button>
	);
};
