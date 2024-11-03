import { useMutation } from '@tanstack/react-query';

import { setProjectPointsAction } from './action';

export const useSetProjectPointsMutation = () =>
  useMutation({
    mutationFn: setProjectPointsAction
  });
