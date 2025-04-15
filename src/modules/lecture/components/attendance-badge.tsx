/**
 * Client-side due to using in SSG page (lectures).
 */
'use client';

import { UserCheck } from 'lucide-react';

import { useAttendanceQuery } from '@/modules/student-lecture/hooks';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

export const AttendanceBadge = ({ lectureId }: { lectureId: string }) => {
  const { data } = useAttendanceQuery();

  if (!data) return null;

  const hasAttendance = data.some(
    attendance => attendance.lectureId === lectureId
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
