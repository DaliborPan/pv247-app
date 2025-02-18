import { Suspense } from 'react';

import { getSessionUser } from '@/modules/session-user/server';
import { StudentOverviewCard } from '@/modules/student/components/student-overview-card';
import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';

import {
  ProfileHero,
  ProfileProjectCard,
  RevalidateLecturesSection
} from './_components';

const Page = async () => {
  const user = await getSessionUser();

  return (
    <>
      <ProfileHero />

      <Suspense>
        {user.role === 'student' ? (
          <div className="mt-4 flex flex-col gap-y-4 lg:mt-8">
            <StudentOverviewCard userId={user.id} projectId={user.projectId} />
            <StudentHomeworkCard userId={user.id} projectId={user.projectId} />
            <ProfileProjectCard />
          </div>
        ) : (
          <RevalidateLecturesSection />
        )}
      </Suspense>
    </>
  );
};

export default Page;
