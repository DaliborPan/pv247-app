import { studentLoaders } from '@/modules/student/loader';
import { SidebarCard } from '../sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';
import { getProjectStatus } from '@/modules/project/utils/project-status';
import { Suspense } from 'react';

export const OverviewCard = () => {
  const overviewPromise = studentLoaders.getMineOverview();

  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <SidebarCardRow title="Attendance">
          <Suspense>
            {overviewPromise.then(
              overview =>
                `${overview.attendances.length}/${overview.lecturesCount}`
            )}
          </Suspense>
        </SidebarCardRow>

        <SidebarCardRow title="Homework">
          <Suspense>
            {overviewPromise.then(
              overview =>
                `${overview.awardedHomeworkCount}/${overview.lecturesCount} | ${overview.totalPoints}p`
            )}
          </Suspense>
        </SidebarCardRow>

        <SidebarCardRow title="Project">
          <Suspense>
            {overviewPromise.then(overview =>
              getProjectStatus(overview.project)
            )}
          </Suspense>
        </SidebarCardRow>
      </div>
    </SidebarCard>
  );
};
