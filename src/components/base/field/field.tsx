import { type ComponentProps } from 'react';

import { cn } from '@/lib/cn';

export const FieldGroup = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('flex flex-col gap-4', className)} {...props} />
);

export const Field = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    role="group"
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
);
