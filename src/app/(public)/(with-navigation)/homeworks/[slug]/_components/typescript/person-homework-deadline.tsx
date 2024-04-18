'use client';

import { useSession } from 'next-auth/react';

import { type Lecture } from '@/db';

export const PersonHomeworkDeadline = ({ lecture }: { lecture: Lecture }) => {
	const session = useSession();

	// Determine deadline for the lecture

	return (
		<>
			<div>{session.data?.user?.name}</div>

			{/* TODO: Add homework deadline to database */}
			<div>{lecture.availableFrom}</div>
		</>
	);
};
