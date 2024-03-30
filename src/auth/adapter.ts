import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { type SQLiteTableFn, sqliteTable } from 'drizzle-orm/sqlite-core';
import { type Adapter } from 'next-auth/adapters';

import {
	users,
	accounts,
	sessions,
	verificationTokens
} from '@/db/schema/users';
import { db } from '@/db';

const tableFn = (...params: Parameters<SQLiteTableFn>) => {
	switch (params[0]) {
		case 'user':
			return users;
		case 'account':
			return accounts;
		case 'session':
			return sessions;
		case 'verification_token':
			return verificationTokens;
		default:
			return sqliteTable(...params);
	}
};

/**
 * Custom Drizzle adapter
 *
 * Needed in order to store additional properties in the user table
 */
export const CustomDrizzleAdapter = DrizzleAdapter(
	db,
	tableFn as SQLiteTableFn
) as Adapter;
