import { type PropsWithChildren } from 'react';

import { ResponsiveSidebarCard } from '@/components/sidebar-card';
import { getMineOverview } from '@/modules/session-user';

const OverviewCardRow = ({
  title,
  children
}: PropsWithChildren<{ title: string }>) => (
  <div className="flex items-center">
    <span className="text-gray-600 grow">{title}</span>
    <span className="text-sm font-medium text-primary">{children}</span>
  </div>
);

export const OverviewCard = async () => {
  const { homeworks, lectures, project } = await getMineOverview();

  return (
    <ResponsiveSidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <OverviewCardRow title="Lectures">{lectures.display}</OverviewCardRow>
        <OverviewCardRow title="Homeworks">{homeworks.display}</OverviewCardRow>
        <OverviewCardRow title="Project">{project.display}</OverviewCardRow>
      </div>
    </ResponsiveSidebarCard>
  );
};
