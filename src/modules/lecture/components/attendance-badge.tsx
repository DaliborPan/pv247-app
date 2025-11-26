import { UserCheck } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

import { getSession } from '@/modules/session-user';
import { studentLectureLoaders } from '@/modules/student-lecture/loader';

export const AttendanceBadge = async ({ lectureId }: { lectureId: string }) => {
  const sessionUser = await getSession();

  if (!sessionUser) return null;

  const attendances = await studentLectureLoaders.getMany({
    userId: sessionUser.id
  });

  const hasAttendance = attendances.some(
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
