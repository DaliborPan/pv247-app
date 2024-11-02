import { useMutation } from '@tanstack/react-query';

import { submitProjectAction } from './action';

export const useSubmitProjectMutation = () =>
	useMutation({
		mutationFn: submitProjectAction
	});
