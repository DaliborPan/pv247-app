'use client';

import { useSession } from 'next-auth/react';

import { type Lecture } from '@/db';
import { formatDate } from '@/lib/date';

export const PersonHomeworkDeadline = ({ lecture }: { lecture: Lecture }) => {
	const session = useSession();
	console.log(session.data?.user);

	// Determine deadline for the logged in user for the lecture (+- one day?)

	return <div>{formatDate(lecture.homeworkDeadline)}</div>;
};
