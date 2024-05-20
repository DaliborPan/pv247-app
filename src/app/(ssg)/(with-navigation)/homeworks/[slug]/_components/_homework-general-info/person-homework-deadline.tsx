'use client';

// import { useSession } from 'next-auth/react';

import { type Lecture } from '@/db';
import { formatDate } from '@/lib/date';

export const PersonHomeworkDeadline = ({ lecture }: { lecture: Lecture }) => (
	<div>{formatDate(lecture.homeworkDeadline)}</div>
);
