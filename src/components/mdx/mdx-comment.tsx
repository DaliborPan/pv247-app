import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const MdxComment = ({
  children,
  className
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      'relative px-6 py-4 mt-10 border-l-4 rounded-lg rounded-bl-none mb-14 border-primary bg-primary-100 [&>p>code]:!bg-primary-200',
      className
    )}
  >
    {children}

    <div className="absolute flex -top-6 -left-[26px]">
      <div className="grid p-2 rounded-full bg-background size-12 text-primary place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
    </div>
  </div>
);
