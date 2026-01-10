import { studentLoaders } from '@/modules/student/loader';
import { SidebarCard } from '@/components/sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';
import { getProjectStatus } from '@/modules/project/utils/project-status';
import { ReactNode, Suspense } from 'react';
import { lectureLoaders } from '@/modules/lecture/loader';
import { Skeleton } from '@/components/skeleton';
import { getSessionUser } from '@/modules/session-user';

const OverviewSidebarCard = ({
  attendance,
  homework,
  project
}: {
  attendance?: ReactNode;
  homework?: ReactNode;
  project?: ReactNode;
}) => {
  return (
    <SidebarCard title="Overview">
      <div className="flex flex-col gap-y-1">
        <SidebarCardRow title="Attendance">
          {attendance ?? <Skeleton className="w-10" />}
        </SidebarCardRow>
        <SidebarCardRow title="Homework">
          {homework ?? <Skeleton className="w-14" />}
        </SidebarCardRow>
        <SidebarCardRow title="Project">
          {project ?? <Skeleton className="w-14" />}
        </SidebarCardRow>
      </div>
    </SidebarCard>
  );
};

export const OverviewCard = async () => {
  const lectures = await lectureLoaders.getMany();
  const homeworkCount = (await lectureLoaders.getAllWithHomework()).length;

  const overviewPromise = studentLoaders.getMineOverview();

  return (
    <Suspense fallback={<OverviewSidebarCard />}>
      {getSessionUser().then(
        sessionUser =>
          sessionUser.role === 'student' && (
            <OverviewSidebarCard
              attendance={
                <Suspense>
                  {overviewPromise.then(
                    overview =>
                      `${overview.attendances.length}/${lectures.length}`
                  )}
                </Suspense>
              }
              homework={
                <Suspense>
                  {overviewPromise.then(
                    overview =>
                      `${overview.awardedHomeworkCount}/${homeworkCount} | ${overview.totalPoints}p`
                  )}
                </Suspense>
              }
              project={
                <Suspense>
                  {overviewPromise.then(overview =>
                    getProjectStatus(overview.project)
                  )}
                </Suspense>
              }
            />
          )
      )}
    </Suspense>
  );
};
