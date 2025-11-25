import { type PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => (
  <div className="container lg:mt-8">{children}</div>
);

export default Layout;
