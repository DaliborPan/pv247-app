import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type SidebarCardProps = PropsWithChildren<{
  title?: React.ReactNode;
  customTitle?: React.ReactNode;
  className?: string;
}>;

export const SidebarCard = ({
  title,
  customTitle,
  children,
  className
}: SidebarCardProps) => (
  <div className={cn('rounded-lg bg-primary-100 p-6 text-sm', className)}>
    {customTitle ? (
      customTitle
    ) : title ? (
      <h3 className="mb-4 text-xl">{title}</h3>
    ) : null}

    {children}
  </div>
);
