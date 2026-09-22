'use client';

import { BookOpen, Lock } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/base/button/button';
import { cn } from '@/lib/cn';

export const LectureCardActions = ({
  isAvailable,
  href
}: {
  isAvailable: boolean;
  href: string;
}) => (
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
