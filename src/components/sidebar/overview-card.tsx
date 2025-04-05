import { getMineOverviewLoader } from '@/modules/student/loader';

import { SidebarCard } from '../sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const OverviewCard = async () => {
  const { homeworks, project, attendance } = await getMineOverviewLoader();

  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <SidebarCardRow title="Attendance">{attendance.display}</SidebarCardRow>
        <SidebarCardRow title="Homework">{homeworks.display}</SidebarCardRow>
        <SidebarCardRow title="Project">{project.display}</SidebarCardRow>
      </div>
    </SidebarCard>
  );
};
