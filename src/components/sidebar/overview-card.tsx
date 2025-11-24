import { studentLoaders } from '@/modules/student/loader';
import { SidebarCard } from '../sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const OverviewCard = async () => {
  const { homeworks, project, attendance, totalPoints, lectures } =
    await studentLoaders.getMineOverview();

  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <SidebarCardRow title="Attendance">
          {attendance.attendances.length}/{lectures.totalLength}`
        </SidebarCardRow>
        <SidebarCardRow title="Homework">
          {homeworks.awardedHomeworksLength}/{lectures.totalLength} |
          {totalPoints}p
        </SidebarCardRow>
        <SidebarCardRow title="Project">
          {!project
            ? 'No project'
            : project.status === 'pending'
              ? 'Pending'
              : project.status === 'approved'
                ? 'Approved'
                : 'Submitted'}
        </SidebarCardRow>
      </div>
    </SidebarCard>
  );
};
