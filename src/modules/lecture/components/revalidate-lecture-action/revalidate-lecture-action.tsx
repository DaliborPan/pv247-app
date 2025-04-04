'use client';

import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/base/button';

import { revalidateLecturesAction } from './action';

const useRevalidateLectureMutation = () =>
  useMutation({
    mutationFn: async () => revalidateLecturesAction()
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
