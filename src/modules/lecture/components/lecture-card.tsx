import Link from 'next/link';
import { Layers, Lock } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';

import { type LectureType } from '../schema';

import { AttendanceBadge } from './attendance-badge';

const getNumberWithOrdinal = (num: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const value = num % 100;

  return num + (s[(value - 20) % 10] || s[value] || s[0]);
};

export const LectureCard = ({
  lecture,
  index,
  isAvailable = true,
  href = `/lectures/${lecture.slug}`
}: {
  lecture: LectureType;
  index: number;
  isAvailable?: boolean;
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
      <Link
        href={href}
        className={cn('grow', !isAvailable && 'pointer-events-none')}
      >
        <Button
          className="w-full lg:w-auto"
          iconLeft={!isAvailable ? { icon: <Lock /> } : undefined}
          disabled={!isAvailable}
          size="sm"
        >
          Open lecture
        </Button>
      </Link>

      <div className="flex gap-x-2">
        <AttendanceBadge lecture={lecture} />

        <Badge variant="outline" className="text-text-terciary">
          <Icon icon={<Layers />} className="mr-2" />
          {getNumberWithOrdinal(index + 1)} week
        </Badge>
      </div>
    </div>
  </article>
);
