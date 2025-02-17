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
  <div className={cn('flex flex-col gap-x-4 lg:flex-row', className)}>
    <div className="grow">{codeBlock}</div>

    <div
      className={cn(
        'my-6 flex justify-center rounded-lg bg-primary-100 p-4 pt-10 shadow',
        childrenWrapperClassName
      )}
    >
      {children}
    </div>
  </div>
);
