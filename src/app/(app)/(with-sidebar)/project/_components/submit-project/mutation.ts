import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type Project } from '@/db';

import { submitProjectAction } from './submit-project-action';

export const useSubmitProjectMutation = (project: Project) =>
	useMutation({
		mutationFn: () => submitProjectAction({ project }),
		onSuccess: () => {
			toast.success('Project submitted!');
		},
		onError: () => {
			toast.error('Failed to submit project');
		}
	});
