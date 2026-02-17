import { Suspense } from 'react';

import { getSession } from '@/modules/session-user';
import { redirect } from 'next/navigation';
import { OnboardingPage } from '@/modules/student/components/onboarding-page';

export const metadata = {
  title: 'Dashboard',
  description: 'PV247 course dashboard - your lectures, homework and project'
};

const Layout = ({ children }: LayoutProps<'/'>) => (
  /*
   * We are checking presence of a session cookie in proxy already.
   * However, it's possible, that the session cookie is expired,
   * so we better check that also here.
   *
   * At the same time, we don't block rendering of static content,
   * hence the fallback is the children.
   */
  <Suspense fallback={children}>
    {getSession().then(sessionUser => {
      if (!sessionUser) {
        redirect('/login');
      }

      const showOnboarding = !sessionUser.github;

      return showOnboarding ? <OnboardingPage /> : children;
    })}
  </Suspense>
);

export default Layout;
