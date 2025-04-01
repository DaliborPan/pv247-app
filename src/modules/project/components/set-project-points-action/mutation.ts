import { useMutation } from '@tanstack/react-query';

import { setProjectPointsAction } from './action';
import { type SetProjectPointsFormSchema } from './schema';

export const useSetProjectPointsMutation = () =>
  useMutation({
    mutationFn: async (data: SetProjectPointsFormSchema) =>
      setProjectPointsAction(data)
  });
