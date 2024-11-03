import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { setProjectPointsAction } from './actions';
import { type SetProjectPointsFormSchema } from './schema';

export const useSetProjectPointsMutation = () =>
  useMutation({
    mutationFn: (data: SetProjectPointsFormSchema) =>
      setProjectPointsAction(data),
    onSuccess: () => {
      toast.success('Project points updated!');
    },
    onError: () => {
      toast.error('Failed to update project points');
    }
  });
