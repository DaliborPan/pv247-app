import { getSessionUser } from '@/modules/session-user';
import { StudentOverviewCard } from '@/modules/student/components/student-overview-card';
import { StudentHomeworkCard } from '@/modules/student/components/student-homework-card';

import { Suspense } from 'react';
import { ProfileHero } from './_components/profile-hero';
import { ProfileProjectCard } from './_components/profile-project-card';
import { LectorLecturesSection } from './_components/lector-lectures-section';

const Page = () => {
  const sessionUserPromise = getSessionUser();

  return (
    <>
      <ProfileHero />

      <div className="mt-4 flex flex-col gap-y-4 lg:mt-8">
        <StudentOverviewCard user={sessionUserPromise} />
        <StudentHomeworkCard user={sessionUserPromise} />
        <ProfileProjectCard />

        <Suspense>
          {sessionUserPromise.then(
            user => user.role === 'lector' && <LectorLecturesSection />
          )}
        </Suspense>
      </div>
    </>
  );
};

export default Page;
