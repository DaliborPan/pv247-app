'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/base/button';

import { acceptAttendanceAction } from './action';

const useAcceptAttendanceMutation = () =>
  useMutation({
    mutationFn: ({
      lectureId,
      studentId
    }: {
      lectureId: string;
      studentId: string;
    }) => acceptAttendanceAction({ lectureId, studentId }),
    onError: e => {
      console.log(e);

      toast.error('Error while accepting attendance');
    }
  });

export const AcceptAttendanceButton = ({
  studentId,
  lectureId
}: {
  studentId: string;
  lectureId: string;
}) => {
  const mutation = useAcceptAttendanceMutation();

  return (
    <Button
      className="w-full whitespace-normal md:w-auto"
      isLoading={mutation.isPending}
      onClick={() => mutation.mutateAsync({ studentId, lectureId })}
    >
      Submit attendance for this week
    </Button>
  );
};
