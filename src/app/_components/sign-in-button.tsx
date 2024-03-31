'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/base/button';

export const SignInButton = () => (
	<Button
		onClick={() => signIn('github')}
		iconLeft={{
			name: 'Github'
		}}
	>
		Sign in with GitHub
	</Button>
);
