/**
 * Client-side due to using in SSG page (lectures).
 */
'use client';

import { MonitorCheck, Layers } from 'lucide-react';

import { useMineHomeworkPointsQuery } from '@/modules/homework/hooks';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';

import { type LectureType } from '../schema';

export const HomeworkPointsBadge = ({ lecture }: { lecture: LectureType }) => {
  const { data } = useMineHomeworkPointsQuery();

  const homework = data?.find(homework => homework.lectureId === lecture.id);

  if (!homework) {
    return (
      <Badge variant="outline" className="text-text-terciary">
        <Icon icon={<Layers />} className="mr-2" />
        Maximum points: {lecture.homeworkMaxPoints}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-text-primary-color text-text-primary-color"
    >
      <Icon icon={<MonitorCheck />} className="mr-2" />
      {homework.points} / {lecture.homeworkMaxPoints}
    </Badge>
  );
};
