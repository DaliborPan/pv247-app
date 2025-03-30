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
  const sessionUser = await getSessionUser();

  return (
    <>
      <ProfileHero />

      <Suspense>
        <div className="mt-4 flex flex-col gap-y-4 lg:mt-8">
          {sessionUser.role === 'student' && (
            <>
              <StudentOverviewCard user={sessionUser} />
              <StudentHomeworkCard user={sessionUser} />
              <ProfileProjectCard />
            </>
          )}

          {sessionUser.role === 'lector' && <LectorLecturesSection />}
        </div>
      </Suspense>
    </>
  );
};

export default Page;
