import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <main className="mx-auto min-w-0 max-w-6xl">{children}</main>
);

export default Layout;
