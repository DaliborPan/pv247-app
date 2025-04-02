import { type PropsWithChildren } from 'react';

import { getMineOverviewLoader } from '@/modules/session-user/loader';

import { SidebarCard } from '../sidebar-card';

const OverviewCardRow = ({
  title,
  children
}: PropsWithChildren<{ title: string }>) => (
  <div className="flex items-center">
    <span className="grow text-text-secondary">{title}</span>
    <span className="text-sm font-medium text-text-primary-color">
      {children}
    </span>
  </div>
);

export const OverviewCard = async () => {
  const { homeworks, project, attendance } = await getMineOverviewLoader();

  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <OverviewCardRow title="Attendance">
          {attendance.display}
        </OverviewCardRow>
        <OverviewCardRow title="Homework">{homeworks.display}</OverviewCardRow>
        <OverviewCardRow title="Project">{project.display}</OverviewCardRow>
      </div>
    </SidebarCard>
  );
};
