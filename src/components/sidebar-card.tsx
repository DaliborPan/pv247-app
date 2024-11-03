'use client';

import { useState, type PropsWithChildren } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/cn';

import { Icon } from './base/icon';

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
  <div className={cn('py-6 pl-8 pr-6 rounded-lg bg-primary-100', className)}>
    {customTitle ? (
      customTitle
    ) : title ? (
      <h3 className="mb-4 text-xl">{title}</h3>
    ) : null}

    {children}
  </div>
);

export const ResponsiveSidebarCard = ({
  className,
  title,
  ...props
}: SidebarCardProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <SidebarCard
      {...props}
      className={cn(
        'py-0 pr-2 lg:py-6 lg:pr-6',
        collapsed ? 'h-14 lg:h-auto overflow-y-hidden lg:overflow-visible' : '',
        className
      )}
      customTitle={
        <div className="flex items-center mb-4">
          <h3 className="text-xl grow py-4 lg:py-0">{title}</h3>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center lg:hidden p-4"
          >
            <Icon
              icon={collapsed ? <ChevronDown /> : <ChevronUp />}
              className="size-6"
            />
          </button>
        </div>
      }
    />
  );
};
