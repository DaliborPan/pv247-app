import { useMutation } from '@tanstack/react-query';

import { type SetHomeworkPointsFormSchema } from './schema';
import { setHomeworkPointsAction } from './action';

export const useSetHomeworkPointsMutation = () =>
  useMutation({
    mutationFn: async (data: SetHomeworkPointsFormSchema) =>
      setHomeworkPointsAction(data)
  });
