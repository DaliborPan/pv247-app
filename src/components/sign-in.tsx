'use client';

import { Slot } from '@radix-ui/react-slot';
import { Suspense, type PropsWithChildren } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { signIn } from '@/auth/client';

export const InternalSignIn = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrlFromQuery = searchParams.get('callbackUrl');
  const callbackUrl =
    callbackUrlFromQuery ?? (pathname.startsWith('/login') ? '/' : pathname);

  return (
    <Slot
      onClick={() =>
        signIn.social({
          provider: 'github',
          callbackURL: callbackUrl
        })
      }
    >
      {children}
    </Slot>
  );
};

export const SignIn = ({ children }: PropsWithChildren) => (
  <Suspense>
    <InternalSignIn>{children}</InternalSignIn>
  </Suspense>
);
