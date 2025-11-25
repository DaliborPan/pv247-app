import { studentLoaders } from '@/modules/student/loader';
import { SidebarCard } from '../sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';
import { getProjectStatus } from '@/modules/project/utils/project-status';
import { Suspense } from 'react';
import { lectureLoaders } from '@/modules/lecture/loader';

export const OverviewCard = async () => {
  const lectures = await lectureLoaders.getOrdered();
  const overviewPromise = studentLoaders.getMineOverview();

  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <SidebarCardRow title="Attendance">
          <Suspense>
            {overviewPromise.then(
              overview => `${overview.attendances.length}/${lectures.length}`
            )}
          </Suspense>
        </SidebarCardRow>

        <SidebarCardRow title="Homework">
          <Suspense>
            {overviewPromise.then(
              overview =>
                `${overview.awardedHomeworkCount}/${lectures.length} | ${overview.totalPoints}p`
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
