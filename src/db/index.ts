import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { homeworks } from './schema/homeworks';
import { lectures } from './schema/lectures';
import { projects } from './schema/projects';
import { users } from './schema/users';

const client = createClient({
	url: process.env.DATABASE_URL ?? '',
	authToken: process.env.AUTH_TOKEN
});

const db = drizzle(client);

export { db, homeworks, lectures, projects, users };
