import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const LabeledValue = ({
  children,
  label,
  labelClassName,
  wrapperClassName
}: PropsWithChildren<{
  label: string;
  labelClassName?: string;
  valueClassName?: string;
  wrapperClassName?: string;
}>) => (
  <div className={cn('flex flex-col font-medium', wrapperClassName)}>
    <span
      className={cn(
        'text-xs font-light uppercase text-text-secondary',
        labelClassName
      )}
    >
      {label}
    </span>

    {children}
  </div>
);
