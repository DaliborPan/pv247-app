'use client';

import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type PropsWithChildren } from 'react';

import { signOut } from '@/auth/client';

export const Logout = forwardRef<HTMLElement, PropsWithChildren>(
  ({ children, ...props }, ref) => (
    <Slot ref={ref} onClick={() => signOut()} {...props}>
      {children}
    </Slot>
  )
);
