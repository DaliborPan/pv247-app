import { type PropsWithChildren } from 'react';

import { Navigation } from '@/components/navigation/navigation';
import { getSession } from '@/modules/session-user/session-user';

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Navigation user={getSession()} />

    <div className="container my-8">{children}</div>
  </>
);

export default Layout;
