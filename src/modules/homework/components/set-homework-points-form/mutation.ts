import { useMutation } from '@tanstack/react-query';

import { type SetHomeworkPointsFormSchema } from './schema';
import { createHomeworkAction, updateHomeworkPointsAction } from './action';

export const useSetHomeworkPointsMutation = ({
	isCreating
}: {
	isCreating: boolean;
}) =>
	useMutation({
		mutationFn: (data: SetHomeworkPointsFormSchema) => {
			const action = isCreating
				? createHomeworkAction
				: updateHomeworkPointsAction;

			return action(data);
		}
	});
