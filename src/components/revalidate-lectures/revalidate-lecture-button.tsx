'use client';

import { type Lecture } from '@/db';

import { Button } from '../base/button';

import { revalidateLectureAction } from './action';

export const RevalidateLectureButton = ({ lecture }: { lecture: Lecture }) => (
	<Button onClick={() => revalidateLectureAction(lecture)}>
		{lecture.name}
	</Button>
);
