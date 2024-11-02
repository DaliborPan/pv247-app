import { useMutation } from '@tanstack/react-query';

import { createProjectAction, updateProjectAction } from './action';
import { type ProjectFormSchema } from './schema';

export const useSubmitProjectFormMutation = (
	{ isCreating } = {
		isCreating: false
	}
) =>
	useMutation({
		mutationFn: (data: ProjectFormSchema) => {
			const action = isCreating ? createProjectAction : updateProjectAction;

			return action(data);
		}
	});
