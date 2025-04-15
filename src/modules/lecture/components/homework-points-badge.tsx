/**
 * Client-side due to using in SSG page (lectures).
 */
'use client';

import { MonitorCheck, Layers } from 'lucide-react';

import { useMineHomeworkPointsQuery } from '@/modules/homework/hooks';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

export const HomeworkPointsBadge = ({
  maxPoints,
  lectureId
}: {
  maxPoints: number;
  lectureId: string;
}) => {
  const { data } = useMineHomeworkPointsQuery();

  const homework = data?.find(homework => homework.lectureId === lectureId);

  if (!homework) {
    return (
      <Badge variant="outline" className="text-text-terciary">
        <Icon icon={<Layers />} className="mr-2" />
        Maximum points: {maxPoints}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-text-primary-color text-text-primary-color"
    >
      <Icon icon={<MonitorCheck />} className="mr-2" />
      {homework.points} / {maxPoints}
    </Badge>
  );
};
