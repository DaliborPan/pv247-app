'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';
import { type StudentHomeworkStatusType } from '../../schema';
import {
  createOwnHomeworkRepositoryAction,
  completeOwnHomeworkRepositoryAction
} from './action';

export const CreateHomeworkRepositoryAction = ({
  lectureId,
  status
}: {
  lectureId: string;
  status?: StudentHomeworkStatusType;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (phase: 'create' | 'complete') => {
      const [response, error] = await (
        phase === 'create'
          ? createOwnHomeworkRepositoryAction
          : completeOwnHomeworkRepositoryAction
      )({ lectureId });
      if (error) throw new Error(error.message);
      if (response?.error) throw new Error(response.error);
      if (!response?.result)
        throw new Error(
          'Repository setup returned no result. Refresh and try again.'
        );
      return response.result;
    },
    retry: false,
    onSuccess: result => {
      if (result.status === 'ready') {
        toast.success('Repository setup completed.');
        router.refresh();
      }
    },
    onError: error => {
      toast.error(error.message);
      router.refresh();
    }
  });

  const { mutate, isPending } = mutation;
  const mutationStatus = mutation.data?.status;
  const hasRepository =
    status === 'repository_created' ||
    mutationStatus === 'preparing' ||
    mutationStatus === 'ready';

  if (status === 'ready' || mutationStatus === 'ready') return null;

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        size="sm"
        variant="outline/primary"
        type="button"
        isLoading={isPending}
        disabled={isPending}
        onClick={() => {
          mutate(hasRepository ? 'complete' : 'create');
        }}
      >
        {isPending
          ? mutation.variables === 'create'
            ? 'Creating...'
            : 'Finishing setup...'
          : hasRepository
            ? 'Finish setup'
            : status === 'pending'
              ? 'Try again'
              : 'Create repository'}
      </Button>

      {mutationStatus === 'preparing' && !mutation.isError && (
        <p className="max-w-xs text-xs text-text-terciary" role="status">
          GitHub is creating your repository. Wait at least one minute, then
          click Finish setup to check again.
        </p>
      )}
    </div>
  );
};
