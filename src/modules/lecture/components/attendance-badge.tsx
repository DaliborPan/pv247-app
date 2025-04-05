/**
 * Client-side due to using in SSG page (lectures).
 */
'use client';

import { UserCheck } from 'lucide-react';

import { useAttendanceQuery } from '@/modules/student-lecture/hooks';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

import { type LectureType } from '../schema';

export const AttendanceBadge = ({ lecture }: { lecture: LectureType }) => {
  const { data } = useAttendanceQuery();

  if (!data) return null;

  const hasAttendance = data.some(
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
