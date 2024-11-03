import { Suspense } from 'react';

import { getSessionUser } from '@/modules/session-user';
import { StudentOverviewCard, StudentHomeworkCard } from '@/modules/student';

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
        {user.role !== 'lector' ? (
          <>
            <StudentOverviewCard userId={user.id} projectId={user.projectId} />
            <StudentHomeworkCard userId={user.id} projectId={user.projectId} />
            <ProfileProjectCard />
          </>
        ) : (
          <RevalidateLecturesSection />
        )}
      </Suspense>
    </>
  );
};

export default Page;
