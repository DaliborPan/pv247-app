import { useMutation } from '@tanstack/react-query';

import { approveProjectAction } from './action';

export const useApproveProjectMutation = () =>
  useMutation({
    mutationFn: approveProjectAction
  });
