import type { PropsWithChildren } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/cn';

export type IconProps = {
  icon: React.ReactNode;
  className?: string;
};

export const Icon = ({ icon, className }: PropsWithChildren<IconProps>) => (
  <Slot className={cn('size-4 flex-shrink-0', className)}>{icon}</Slot>
);
