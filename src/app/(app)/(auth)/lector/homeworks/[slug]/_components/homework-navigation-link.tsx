'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { type LectureType } from '@/modules/lecture/schema';

export const HomeworkNavigationLink = ({
  type,
  lecture
}: {
  type: 'previous' | 'next';
  lecture: LectureType;
}) => {
  const searchParams = useSearchParams();
  const viewType = searchParams.get('type') ?? 'all';

  const ChevronIcon = type === 'previous' ? ChevronLeft : ChevronRight;

  return (
    <Link href={`/lector/homeworks/${lecture.homeworkSlug}?type=${viewType}`}>
      <Button
        variant="ghost"
        className="flex h-auto flex-col items-start font-normal hover:bg-white hover:shadow"
      >
        <span
          className={cn(
            'text-xs font-light text-text-terciary',
            type === 'previous' && 'pl-6'
          )}
        >
          {type === 'previous' ? 'Previous' : 'Next'}
        </span>

        <div
          className={cn(
            'flex items-center gap-x-2 font-medium',
            type === 'next' && 'flex-row-reverse'
          )}
        >
          <Icon icon={<ChevronIcon />} />
          <span>{lecture?.name}</span>
        </div>
      </Button>
    </Link>
  );
};
