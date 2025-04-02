import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { OnboardingPage } from '@/modules/student/components/onboarding-page/onboarding-page';
import { getSessionUser } from '@/modules/session-user';

const Layout = async ({ children }: PropsWithChildren) => {
  const sessionUser = await getSessionUser();

  const showOnboarding = !sessionUser.github;

  return (
    <>
      <Navigation user={sessionUser} />

      <div className="my-8">
        {showOnboarding ? <OnboardingPage /> : children}
      </div>
    </>
  );
};

export default Layout;
