/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { type DefaultSession } from 'next-auth';
import { type AdapterUser } from 'next-auth/adapters';

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {
			id: string;
			role: 'lector' | 'student';
			firstName?: string;
			lastName?: string;
		};
	}

	interface User extends AdapterUser {
		role: 'lector' | 'student';
		firstName?: string;
		lastName?: string;
	}
}
