import { Suspense } from 'react';

import { getSessionUser } from '@/modules/session-user/session-user';

import { HomeworksCard } from './homeworks-card';
import { ProjectTimelineCard } from './important-dates-card';
import { LecturesCard } from './lectures-card';
import { OverviewCard } from './overview-card';
import { ProjectCard } from './project-card';

export const Sidebar = () => (
  <aside className="flex flex-col gap-y-4 lg:fixed lg:top-[100px] lg:h-[calc(100vh-132px)] lg:w-[18.5rem] lg:overflow-y-auto lg:pr-3">
    <OverviewCard />
    <ProjectTimelineCard />
    <LecturesCard />
    <HomeworksCard />
    <Suspense>
      {getSessionUser().then(
        user => user.role === 'student' && <ProjectCard />
      )}
    </Suspense>
  </aside>
);
