import { Suspense, type PropsWithChildren } from 'react';

import { Sidebar } from '@/components/sidebar';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container">
    <Suspense>
      <Sidebar />
    </Suspense>

    <div className="pt-4 lg:pl-[20rem] lg:pt-0">{children}</div>
  </div>
);

export default Layout;
