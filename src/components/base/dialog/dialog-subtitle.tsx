import { Description } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

export const DialogSubtitle = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
