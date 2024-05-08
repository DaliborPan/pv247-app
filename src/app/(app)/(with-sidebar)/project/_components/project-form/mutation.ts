import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createProjectAction, updateProjectAction } from './project-action';
import { type ProjectFormSchema } from './schema';

export const useSubmitProjectFormMutation = (
	{ isCreating } = {
		isCreating: false
	}
) => {
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: ProjectFormSchema) => {
			if (isCreating) {
				await createProjectAction(data);
				return;
			}

			await updateProjectAction(data);
		},
		onSuccess: () => {
			toast.success('Project updated successfully.');
			router.replace('/project');
		},
		onError: () => {
			toast.error('An error occurred while updating the project.');
		}
	});
};
