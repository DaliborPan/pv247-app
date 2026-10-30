import { type ReactNode, Suspense } from 'react';

import { SidebarCard } from '@/components/sidebar-card';
import { Skeleton } from '@/components/skeleton';
import {
  getLecturesCachedQuery,
  getLecturesWithHomeworkCachedQuery
} from '@/modules/lecture/queries';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';
import { getSessionUser } from '@/modules/session-user/session-user';
import { getMyStudentOverviewQuery } from '@/modules/student/queries';

import { SidebarCardRow } from './sidebar-card-row';

const OverviewSidebarCard = ({
  attendance,
  homework,
  project
}: {
  attendance?: ReactNode;
  homework?: ReactNode;
  project?: ReactNode;
}) => (
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

export const OverviewCard = async () => {
  const lectures = await getLecturesCachedQuery();
  const homeworkCount = (await getLecturesWithHomeworkCachedQuery()).length;

  return (
    <Suspense fallback={<OverviewSidebarCard />}>
      {getSessionUser().then(sessionUser => {
        if (sessionUser.role !== 'student') return null;

        const overviewPromise = getMyStudentOverviewQuery();

        return (
          <OverviewSidebarCard
            attendance={
              <Suspense>
                {overviewPromise.then(
                  overview => `${overview.attendanceCount}/${lectures.length}`
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
                  getProjectStatusLabel(overview.project)
                )}
              </Suspense>
            }
          />
        );
      })}
    </Suspense>
  );
};
