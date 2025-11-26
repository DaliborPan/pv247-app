import { type PropsWithChildren } from 'react';

export const SidebarCardRow = ({
  title,
  children
}: PropsWithChildren<{ title: string }>) => (
  <div className="flex items-center">
    <span className="inline-block grow text-text-secondary">{title}</span>
    <span className="inline-block text-sm font-medium text-text-primary-color">
      {children}
    </span>
  </div>
);
