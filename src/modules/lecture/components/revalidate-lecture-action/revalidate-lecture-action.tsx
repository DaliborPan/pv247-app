'use client';

import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/base/button';
import { type Lecture } from '@/db';

import { useRevalidateLectureMutation } from './mutation';

export const RevalidateLectureAction = ({ lecture }: { lecture: Lecture }) => {
  const mutation = useRevalidateLectureMutation(lecture);

  return (
    <Button
      size="sm"
      isLoading={mutation.isPending}
      iconLeft={{ icon: <RefreshCw /> }}
      onClick={() => {
        mutation.mutate(void 0, {
          onSuccess: () => {
            toast.success('Lecture revalidated');
          }
        });
      }}
    />
  );
};
