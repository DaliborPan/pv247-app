import { useMutation } from '@tanstack/react-query';

import { setHomeworkPointsAction } from './action';
import { type SetHomeworkPointsFormSchema } from './schema';

export const useSetHomeworkPointsMutation = () =>
  useMutation({
    mutationFn: async (data: SetHomeworkPointsFormSchema) =>
      await setHomeworkPointsAction(data)
  });
