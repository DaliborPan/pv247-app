'use server';

import { lectures, type Lecture } from './schema/lectures';
import { users, type User } from './schema/users';

import { db } from '.';

export const seed = async () => {
	const usersData: User[] = [
		{
			id: '1',
			name: 'User1',
			email: 'user1@email.cz',
			emailVerified: null,
			firstName: 'User 1',
			lastName: 'user 1',
			image: null,
			lectorId: null,
			projectId: null,
			role: 'student'
		},
		{
			id: '2',
			name: 'User2',
			email: 'user2@email.cz',
			emailVerified: null,
			firstName: 'User 2',
			lastName: 'user 2',
			image: null,
			lectorId: null,
			projectId: null,
			role: 'student'
		},
		{
			id: '3',
			name: 'User3',
			email: 'user3@email.cz',
			emailVerified: null,
			firstName: 'User 3',
			lastName: 'user 3',
			image: null,
			lectorId: null,
			projectId: null,
			role: 'student'
		}
	];

	const lecturesData: Lecture[] = [
		{
			id: 'intro',
			name: 'Introduction',
			slug: 'introduction',
			preview: 'Introduction preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 10,
			homeworkName: 'TypeScript',
			homeworkPreview: 'TypeScript homework preivew',
			homeworkSlug: 'typescript'
		},
		{
			id: 'react',
			name: 'React',
			slug: 'react',
			preview: 'React preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 10,
			homeworkName: 'React basics',
			homeworkPreview: 'React homework preivew',
			homeworkSlug: 'react-basic'
		},
		{
			id: 'styling',
			name: 'Styling',
			slug: 'styling',
			preview: 'Styling preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 30,
			homeworkName: 'Styling - tailwindcss',
			homeworkPreview: 'Tailwindcss homework preivew',
			homeworkSlug: 'styling'
		},
		{
			id: 'hooks',
			name: 'React hooks, state',
			slug: 'hooks',
			preview: 'React hooks, state preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 10,
			homeworkName: 'React state',
			homeworkPreview: 'React state homework preivew',
			homeworkSlug: 'state'
		},
		{
			id: 'other-hooks-refs-tables',
			name: 'Hooks, refs, tables',
			slug: 'other-hooks-refs-tables',
			preview: 'Hooks, refs, tables preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 20,
			homeworkName: 'Table, ref, memo',
			homeworkPreview: 'Table, ref, memo homework preivew',
			homeworkSlug: 'table-memo'
		},
		{
			id: 'async-forms',
			name: 'Async, forsm',
			slug: 'async-forms',
			preview: 'Async, forms preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 40,
			homeworkName: 'Forms, working with async data',
			homeworkPreview: 'Forms, working with async data homework preivew',
			homeworkSlug: 'forms-async'
		},
		{
			id: 'nextjs',
			name: 'Next.js - the React framework',
			slug: 'nextjs',
			preview: 'Next.js preview lecture',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 20,
			homeworkName: 'Next.js basics, routing',
			homeworkPreview: 'Next.js basics homework preivew',
			homeworkSlug: 'nextjs-basic'
		},
		{
			id: 'suspense-streaming-rsc',
			name: 'Suspense, streaming, RSC',
			slug: 'suspense-streaming-rsc',
			preview: 'Suspense, streaming, RSC preview lecture',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 30,
			homeworkName: 'Suspense, React Server Components',
			homeworkPreview: 'Suspense, React Server Components homework preivew',
			homeworkSlug: 'rsc-forms'
		},
		{
			id: 'api-routes-configs-caching-server-actions-database',
			name: 'API routes, configs, caching, server actions, database',
			slug: 'api-routes-configs-caching-server-actions-database',
			preview:
				'API routes, configs, caching, server actions, database preview lecture',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 40,
			homeworkName: 'API, server actions, database',
			homeworkPreview: 'API, server actions, database homework preivew',
			homeworkSlug: 'api-actions-database'
		},
		{
			id: 'authentication-metadata-deployment',
			name: 'Authentication, metadata, deployment',
			slug: 'authentication-metadata-deployment',
			preview: 'Authentication, metadata, deployment preview lecture',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 0,
			homeworkName: '',
			homeworkPreview: '',
			homeworkSlug: 'auth-meta-deploy'
		}
	];

	for (const user of usersData) {
		await db.insert(users).values(user);
	}

	for (const lecture of lecturesData) {
		await db.insert(lectures).values(lecture);
	}
};
