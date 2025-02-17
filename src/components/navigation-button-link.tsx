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
        className="flex h-auto w-full items-center justify-between bg-white py-4 font-normal hover:bg-white hover:shadow md:items-start md:justify-start md:bg-transparent"
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

        <Icon icon={<ChevronIcon />} className="size-6 md:hidden" />
      </Button>
    </Link>
  );
};
