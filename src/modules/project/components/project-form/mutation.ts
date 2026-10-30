import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createProjectAction, updateProjectAction } from './action';
import {
  type CreateProjectFormType,
  type UpdateProjectFormType
} from './schema';

export const useCreateProjectFormMutation = () =>
  useMutation({
    mutationFn: async (data: CreateProjectFormType) => {
      const [result, error] = await createProjectAction(data);

      if (error) throw new Error(error.message);

      return result;
    },
    onError: error => {
      toast.error(error.message);
    }
  });

export const useUpdateProjectFormMutation = () =>
  useMutation({
    mutationFn: async (data: UpdateProjectFormType) => {
      const [result, error] = await updateProjectAction(data);

      if (error) throw new Error(error.message);

      return result;
    },
    onError: error => {
      toast.error(error.message);
    }
  });
