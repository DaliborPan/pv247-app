'use client';

import { useMutation } from '@tanstack/react-query';
import { UserMinus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/base/button/button';

import { signOutLectureAction } from './action';

const useSignOutLectureMutation = (lectureId: string) =>
  useMutation({
    mutationFn: async () => await signOutLectureAction({ lectureId })
  });

export const SignOutLectureAction = ({ lectureId }: { lectureId: string }) => {
  const mutation = useSignOutLectureMutation(lectureId);

  return (
    <Button
      size="sm"
      variant="outline"
      isLoading={mutation.isPending}
      iconLeft={{ icon: <UserMinus /> }}
      onClick={async () => {
        const [_, error] = await mutation.mutateAsync();

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Logged out of lecture.');
      }}
    >
      Sign out
    </Button>
  );
};
