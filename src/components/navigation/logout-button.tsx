'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/base/button';

export const LogoutButton = () => (
	<Button
		iconLeft={{
			name: 'LogOut'
		}}
		variant="ghost"
		size="sm"
		onClick={() => signOut()}
	/>
);
