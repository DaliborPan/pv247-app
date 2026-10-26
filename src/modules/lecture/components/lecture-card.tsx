import { Layers } from 'lucide-react';
import { Suspense } from 'react';

import { Badge } from '@/components/base/badge/badge';
import { Icon } from '@/components/base/icon/icon';
import { OverviewCard } from '@/components/overview-card';
import { formatDate } from '@/lib/date';
import { type LectureType } from '@/modules/lecture/types';

import { AttendanceBadge } from './attendance-badge';
import { LectureCardActions } from './lecture-card-actions';

const getNumberWithOrdinal = (num: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const value = num % 100;

  return num + (s[(value - 20) % 10] || s[value] || s[0]);
};

export const LectureCard = ({
  lecture,
  index,
  isAlwaysAvailable = false,
  href = `/lectures/${lecture.slug}`
}: {
  lecture: LectureType;
  index: number;
  isAlwaysAvailable?: boolean;
  href?: string;
}) => (
  <OverviewCard>
    <OverviewCard.Meta>
      from {formatDate(lecture.availableFrom)}
    </OverviewCard.Meta>

    <OverviewCard.Title>{lecture.name}</OverviewCard.Title>

    <OverviewCard.Description>{lecture.preview}</OverviewCard.Description>

    <OverviewCard.Footer>
      <Suspense>
        <LectureCardActions
          isAvailable={isAlwaysAvailable || lecture.isAvailable}
          href={href}
        />
      </Suspense>

      <div className="flex gap-x-2">
        <Suspense>
          <AttendanceBadge lectureId={lecture.id} />
        </Suspense>

        <Badge variant="outline" className="text-text-terciary">
          <Icon icon={<Layers />} className="mr-2" />
          {getNumberWithOrdinal(index + 1)} week
        </Badge>
      </div>
    </OverviewCard.Footer>
  </OverviewCard>
);
