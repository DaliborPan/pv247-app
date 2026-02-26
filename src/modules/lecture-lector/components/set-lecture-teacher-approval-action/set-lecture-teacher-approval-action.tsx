'use client';

import { type ReactNode } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';

import { setLectureTeacherApprovalAction } from './action';

const useSetLectureTeacherApprovalMutation = () =>
  useMutation({
    mutationFn: async (input: {
      lectureId: string;
      lectorId: string;
      isApproved: boolean;
    }) => setLectureTeacherApprovalAction(input)
  });

export const SetLectureTeacherApprovalAction = ({
  lectureId,
  lectorId,
  isApproved,
  disabled,
  className,
  children
}: {
  lectureId: string;
  lectorId: string;
  isApproved: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  const mutation = useSetLectureTeacherApprovalMutation();

  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={disabled || mutation.isPending}
      aria-busy={mutation.isPending}
      aria-label={isApproved ? 'Odebrat vyucujiciho' : 'Nastavit vyucujiciho'}
      title={isApproved ? 'Odebrat vyucujiciho' : 'Nastavit vyucujiciho'}
      className={cn(
        'h-auto w-full justify-start p-0 text-left transition-opacity',
        mutation.isPending && 'opacity-60',
        className
      )}
      onClick={async () => {
        const [_, error] = await mutation.mutateAsync({
          lectureId,
          lectorId,
          isApproved: !isApproved
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success(
          isApproved ? 'Vyucujici odebran.' : 'Vyucujici nastaven.'
        );
      }}
    >
      {children}
    </Button>
  );
};
