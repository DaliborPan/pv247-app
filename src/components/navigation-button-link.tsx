import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { cn } from '@/lib/cn';

export const NavigationButtonLink = ({
  type,
  href,
  name
}: {
  type: 'previous' | 'next';
  href: string;
  name: string;
}) => {
  const ChevronIcon = type === 'previous' ? ChevronLeft : ChevronRight;

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className="flex items-center md:items-start justify-between w-full h-auto py-4 font-normal bg-white hover:bg-white hover:shadow md:bg-transparent md:justify-start"
      >
        <div className="flex flex-col items-start">
          <span
            className={cn(
              'text-sm text-gray-600',
              type === 'previous' && 'md:pl-6'
            )}
          >
            {type === 'previous' ? 'Previous' : 'Next'}
          </span>
          <div
            className={cn(
              'flex items-center font-medium md:gap-x-2',
              type === 'next' && 'flex-row-reverse'
            )}
          >
            <Icon icon={<ChevronIcon />} className="hidden md:block" />
            <span>{name}</span>
          </div>
        </div>

        <Icon icon={<ChevronIcon />} className="md:hidden size-6" />
      </Button>
    </Link>
  );
};
