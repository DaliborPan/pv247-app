'use client';

import { Slot } from '@radix-ui/react-slot';
import { signOut } from 'next-auth/react';
import { forwardRef, type PropsWithChildren } from 'react';

export const Logout = forwardRef<HTMLElement, PropsWithChildren>(
	({ children, ...props }, ref) => (
		<Slot ref={ref} onClick={() => signOut()} {...props}>
			{children}
		</Slot>
	)
);
