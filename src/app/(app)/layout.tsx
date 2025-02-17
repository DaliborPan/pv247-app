import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { getSessionUser } from '@/modules/session-user/server';
import { OnboardingPage } from '@/modules/student/components/onboarding-page/onboarding-page';

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser();

  const showOnboarding = !user.github;

  return (
    <>
      <Navigation user={user} />

      <div className="my-8">
        {showOnboarding ? <OnboardingPage /> : children}
      </div>
    </>
  );
};

export default Layout;
