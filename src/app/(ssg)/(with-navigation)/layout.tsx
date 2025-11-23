'use client';

import { type PropsWithChildren } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { useSession } from '@/auth/client';
import { Navigation } from '@/components/navigation';

type Page = '/homeworks' | '/lectures';

const pageTitleMap: Record<Page, string> = {
  '/homeworks': 'Weekly homework',
  '/lectures': 'Lectures'
};

/**
 * We need to get user client-side here in order to generate lectures statically
 */
const PublicNavigation = () => {
  const { user, isPending } = useSession();

  return <Navigation user={user} isUserLoading={isPending} />;
};

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname() as Page;
  const params = useParams();

  return (
    <>
      <PublicNavigation />

      <div className="container my-8">
        {!params.slug ? (
          <>
            <h1 className="mb-6 text-3xl">{pageTitleMap[pathname]}</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {children}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default Layout;
