import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import {
	homeworks,
	type Homework,
	type HomeworkInsert
} from './schema/homeworks';
import {
	lectures,
	lectureSlugSchema,
	homeworkSlugSchema,
	type Lecture,
	type LectureSlug,
	type HomeworkSlug
} from './schema/lectures';
import { projects, type Project } from './schema/projects';
import { users, type User } from './schema/users';
import * as relations from './schema/relations';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

const db = drizzle(client, {
	schema: {
		homeworks,

		lectures,
		projects,
		users,
		...relations
	}
});

export {
	db,

	// homeworks
	homeworks,
	type Homework,
	type HomeworkInsert,

	// lecture
	lectures,
	lectureSlugSchema,
	homeworkSlugSchema,
	type Lecture,
	type LectureSlug,
	type HomeworkSlug,

	// project
	projects,
	type Project,

	// users
	users,
	type User
};
