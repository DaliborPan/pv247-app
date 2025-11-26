import { Layers } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { formatDate } from '@/lib/date';

import { type LectureType } from '../schema';

import { AttendanceBadge } from './attendance-badge';
import { LectureCardActions } from './lecture-card-actions';
import { Suspense } from 'react';

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
  <article className="flex flex-col rounded-lg bg-white p-6 shadow">
    <span className="mb-1 flex items-center text-xs text-text-terciary">
      from {formatDate(lecture.availableFrom)}
    </span>

    <h2 className="text-xl font-medium">{lecture.name}</h2>

    <TextPreview className="mt-3 line-clamp-5 grow">
      {lecture.preview}
    </TextPreview>

    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
      <Suspense>
        <LectureCardActions
          lecture={lecture}
          href={href}
          isAlwaysAvailable={isAlwaysAvailable}
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
    </div>
  </article>
);
