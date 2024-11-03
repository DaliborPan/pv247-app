'use client';

import { signIn } from 'next-auth/react';
import { Slot } from '@radix-ui/react-slot';
import { type PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export const SignIn = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const callbackUrl = pathname.startsWith('/login') ? '/' : pathname;

  return (
    <Slot onClick={() => signIn('github', { callbackUrl })}>{children}</Slot>
  );
};
