import { type PropsWithChildren } from 'react';

import { Sidebar } from '@/components/sidebar';

const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Sidebar />

    <div className="pt-4 lg:pl-[20rem] lg:pt-0">{children}</div>
  </>
);

export default Layout;
