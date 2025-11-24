import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { OnboardingPage } from '@/modules/student/components/onboarding-page/onboarding-page';
import { getSession } from '@/modules/session-user';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: PropsWithChildren) => {
  const sessionUser = await getSession();

  if (!sessionUser) {
    redirect('/login');
  }

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
