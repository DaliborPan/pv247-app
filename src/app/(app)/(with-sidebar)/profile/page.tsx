import { Suspense } from 'react';

import { getSessionUser } from '@/modules/session-user/server';
import { StudentOverviewCard } from '@/modules/student/components/student-overview-card';
import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';

import {
  ProfileHero,
  ProfileProjectCard,
  LectorLecturesSection
} from './_components';

const Page = async () => {
  const user = await getSessionUser();

  return (
    <>
      <ProfileHero />

      <Suspense>
        <div className="mt-4 flex flex-col gap-y-4 lg:mt-8">
          {user.role === 'student' ? (
            <>
              <StudentOverviewCard
                userId={user.id}
                projectId={user.projectId}
              />
              <StudentHomeworkCard
                userId={user.id}
                projectId={user.projectId}
              />
              <ProfileProjectCard />
            </>
          ) : (
            <LectorLecturesSection />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default Page;
