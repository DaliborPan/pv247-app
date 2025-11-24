import { Suspense, type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation';
import { getSession } from '@/modules/session-user';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation user={getSession()} />

      <div className="container my-8">{children}</div>
    </>
  );
};

export default Layout;
