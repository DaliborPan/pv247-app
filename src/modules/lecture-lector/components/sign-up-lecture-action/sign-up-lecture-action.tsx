'use client';

import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/base/button';

import { signUpLectureAction } from './action';

const useSignUpLectureMutation = (lectureId: string) =>
  useMutation({
    mutationFn: async () => signUpLectureAction({ lectureId })
  });

export const SignUpLectureAction = ({
  lectureId,
  disabled
}: {
  lectureId: string;
  disabled?: boolean;
}) => {
  const mutation = useSignUpLectureMutation(lectureId);

  return (
    <Button
      size="sm"
      variant="outline/primary"
      isLoading={mutation.isPending}
      disabled={disabled}
      iconLeft={{ icon: <UserPlus /> }}
      onClick={async () => {
        const [result, error] = await mutation.mutateAsync();

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success('Logged in to lecture.');
      }}
    >
      Přihlásit se
    </Button>
  );
};
