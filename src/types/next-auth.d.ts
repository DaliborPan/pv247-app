/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { type DefaultSession } from 'next-auth';
import { type AdapterUser } from 'next-auth/adapters';

import { type User as DbUser } from '@/db/';

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & DbUser;
	}

	interface User extends AdapterUser, DbUser {}
}
