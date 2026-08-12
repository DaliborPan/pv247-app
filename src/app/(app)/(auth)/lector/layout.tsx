import { type PropsWithChildren } from 'react';

import { SubNavigation } from './_components/sub-navigation';

export const metadata = {
  title: 'Lector',
  description: 'PV247 course dashboard - your lectures, homework and project'
};

const Layout = ({ children }: PropsWithChildren) => (
  <div className="-mt-8">
    <SubNavigation />

    <main className="mt-8">{children}</main>
  </div>
);

export default Layout;
