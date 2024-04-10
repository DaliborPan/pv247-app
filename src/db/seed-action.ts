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
			firstName: null,
			lastName: null,
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
			firstName: null,
			lastName: null,
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
			firstName: null,
			lastName: null,
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
			homeworkMaxPoints: 20,
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
			homeworkSlug: 'react'
		},
		{
			id: 'styling',
			name: 'Styling',
			slug: 'styling',
			preview: 'Styling preview',
			availableFrom: '2021-10-10T10:00:00',
			homeworkClassroomLink: '',
			homeworkMaxPoints: 30,
			homeworkName: 'Tailwindcss',
			homeworkPreview: 'Tailwindcss homework preivew',
			homeworkSlug: 'tailwindcss'
		}
	];

	for (const user of usersData) {
		await db.insert(users).values(user);
	}

	for (const lecture of lecturesData) {
		await db.insert(lectures).values(lecture);
	}
};
