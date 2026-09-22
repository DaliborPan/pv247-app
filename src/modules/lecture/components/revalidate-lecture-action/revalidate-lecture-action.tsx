'use client';

import { useMutation } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';

import { revalidateLecturesAction } from './action';

const useRevalidateLectureMutation = () =>
  useMutation({
    mutationFn: async () => await revalidateLecturesAction()
  });

export const RevalidateLecturesAction = () => {
  const mutation = useRevalidateLectureMutation();

  return (
    <Button
      size="xs"
      variant="outline/primary"
      isLoading={mutation.isPending}
      iconLeft={{ icon: <RefreshCw /> }}
      onClick={async () => {
        const [_result, error] = await mutation.mutateAsync();

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Lectures revalidated');
      }}
    >
      Revalidate
    </Button>
  );
};
