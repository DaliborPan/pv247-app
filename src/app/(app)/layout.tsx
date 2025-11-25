import { Suspense, type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { OnboardingPage } from '@/modules/student/components/onboarding-page/onboarding-page';
import { getSession } from '@/modules/session-user';
import { redirect } from 'next/navigation';

const Layout = ({ children }: PropsWithChildren) => {
  const sessionUserPromise = getSession();

  return (
    <>
      <Navigation user={sessionUserPromise} />

      <div className="my-8">
        <Suspense fallback={children}>
          {sessionUserPromise.then(sessionUser => {
            if (!sessionUser) {
              redirect('/login');
            }

            const showOnboarding = !sessionUser.github;

            return showOnboarding ? <OnboardingPage /> : children;
          })}
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
