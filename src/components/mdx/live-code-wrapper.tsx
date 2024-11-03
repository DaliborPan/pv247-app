import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const LiveCodeWrapper = ({
  codeBlock,
  children,
  className,
  childrenWrapperClassName
}: PropsWithChildren<{
  codeBlock: React.ReactNode;
  className?: string;
  childrenWrapperClassName?: string;
}>) => (
  <div className={cn('flex flex-col lg:flex-row gap-x-4', className)}>
    <div className="grow">{codeBlock}</div>

    <div
      className={cn(
        'flex justify-center p-4 pt-10 my-6 rounded-lg shadow bg-primary-100',
        childrenWrapperClassName
      )}
    >
      {children}
    </div>
  </div>
);
