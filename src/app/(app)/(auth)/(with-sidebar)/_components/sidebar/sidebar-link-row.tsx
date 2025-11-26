import Link, { type LinkProps } from 'next/link';
import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const SidebarLinkRow = ({
  isAvailable,
  href,
  children,
  ...props
}: LinkProps &
  PropsWithChildren<{
    isAvailable?: boolean;
  }>) => (
  <Link
    {...props}
    href={href}
    className={cn(
      'flex items-center text-text-secondary hover:underline',
      !isAvailable && 'pointer-events-none opacity-50'
    )}
  >
    {children}
  </Link>
);
