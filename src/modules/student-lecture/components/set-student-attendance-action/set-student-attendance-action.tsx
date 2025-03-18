'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Trash, UserCheck } from 'lucide-react';

import { Button } from '@/components/base/button';

import { setStudentAttendanceAction } from './action';

const useSetStudentAttendanceMutation = () =>
  useMutation({
    mutationFn: async ({
      studentId,
      lectureId
    }: {
      studentId: string;
      lectureId: string;
    }) => {
      const result = await setStudentAttendanceAction({ studentId, lectureId });

      if (result.status === 'error') {
        toast.error(result.message);
      }

      toast.success(
        result.status === 'created'
          ? 'Attendance set successfully'
          : 'Attendance removed successfully'
      );
    }
  });

export const SetStudentAttendanceAction = ({
  studentId,
  lectureId,
  hasAttendance
}: {
  studentId: string;
  lectureId: string;
  hasAttendance: boolean;
}) => {
  const mutation = useSetStudentAttendanceMutation();

  return (
    <Button
      size="xs"
      isLoading={mutation.isPending}
      variant={hasAttendance ? 'outline/destructive' : 'primary/inverse'}
      onClick={() => mutation.mutate({ studentId, lectureId })}
      iconLeft={{ icon: hasAttendance ? <Trash /> : <UserCheck /> }}
    >
      {!hasAttendance && 'Set attendance'}
    </Button>
  );
};
