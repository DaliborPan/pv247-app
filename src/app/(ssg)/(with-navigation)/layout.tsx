import { Suspense, type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { getSession } from '@/modules/session-user';

const PublicNavigation = async () => {
  const user = await getSession();

  return <Navigation user={user ?? undefined} />;
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Suspense fallback={<Navigation isUserLoading={true} />}>
        <PublicNavigation />
      </Suspense>

      <div className="container my-8">{children}</div>
    </>
  );
};

export default Layout;
