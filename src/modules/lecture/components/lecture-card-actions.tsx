'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

import { Button } from '@/components/base/button/button';
import { BookOpen, Lock } from 'lucide-react';

export const LectureCardActions = ({
  isAvailable,
  href
}: {
  isAvailable: boolean;
  href: string;
}) => {
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
