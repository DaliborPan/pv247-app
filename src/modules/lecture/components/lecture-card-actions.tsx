'use client';

import Link from 'next/link';
import { LectureType } from '../schema';
import { cn } from '@/lib/cn';

import { Button } from '@/components/base/button';
import { BookOpen, Lock } from 'lucide-react';

export const LectureCardActions = ({
  lecture,
  href,
  isAlwaysAvailable
}: {
  lecture: LectureType;
  href: string;
  isAlwaysAvailable: boolean;
}) => {
  const isAvailable = isAlwaysAvailable || lecture.isAvailable;

  return (
    <Link
      href={href}
      className={cn('grow', !isAvailable && 'pointer-events-none')}
    >
      <Button
        className="w-full lg:w-auto"
        iconLeft={{ icon: !isAvailable ? <Lock /> : <BookOpen /> }}
        disabled={!isAvailable}
        size="sm"
      >
        Start learning
      </Button>
    </Link>
  );
};
