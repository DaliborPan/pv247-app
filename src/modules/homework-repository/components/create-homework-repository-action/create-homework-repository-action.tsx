'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/base/button';
import {
  createHomeworkRepositoryAction,
  completeHomeworkRepositoryAction
} from './action';

export const CreateHomeworkRepositoryAction = ({
  lectureId,
  studentId,
  exists,
  retry
}: {
  lectureId: string;
  studentId: string;
  exists: boolean;
  retry: boolean;
}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (phase: 'create' | 'complete') => {
      const action =
        phase === 'create'
          ? createHomeworkRepositoryAction
          : completeHomeworkRepositoryAction;
      const [response, error] = await action({
        lectureId,
        studentId
      });
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
  const status = mutation.data?.status;
  const hasRepository = exists || status === 'preparing' || status === 'ready';

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        size="sm"
        variant="outline/primary"
        type="button"
        isLoading={isPending}
        disabled={isPending || status === 'ready'}
        onClick={() => {
          mutate(hasRepository ? 'complete' : 'create');
        }}
      >
        {isPending
          ? mutation.variables === 'create'
            ? 'Creating...'
            : 'Finishing setup...'
          : status === 'ready'
            ? 'Ready'
            : hasRepository
              ? 'Finish setup'
              : retry
                ? 'Try again'
                : 'Create repository'}
      </Button>
      {status === 'preparing' && !mutation.isError && (
        <p className="max-w-xs text-xs text-text-terciary" role="status">
          GitHub is preparing the repository. Click Finish setup to check again.
        </p>
      )}
    </div>
  );
};
