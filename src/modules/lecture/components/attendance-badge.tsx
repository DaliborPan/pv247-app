/**
 * Client-side due to using in SSG page (lectures).
 */
'use client';

import { useSession } from 'next-auth/react';
import { UserCheck } from 'lucide-react';

import { useAttendanceQuery } from '@/modules/student-lecture/hooks';
import { type Lecture } from '@/db';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

export const AttendanceBadge = ({ lecture }: { lecture: Lecture }) => {
  const session = useSession();

  const { data } = useAttendanceQuery({ studentId: session.data?.user.id });

  if (!data) return null;

  const hasAttendance = data.attendances.some(
    attendance => attendance.lectureId === lecture.id
  );

  return !hasAttendance ? null : (
    <Badge
      variant="outline"
      className="border-text-primary-color text-text-primary-color"
    >
      <Icon icon={<UserCheck />} className="mr-2" />
      Attended
    </Badge>
  );
};
