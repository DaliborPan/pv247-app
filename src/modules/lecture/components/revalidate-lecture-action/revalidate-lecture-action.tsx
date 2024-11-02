'use client';

import { toast } from 'sonner';

import { Button } from '@/components/base/button';
import { type Lecture } from '@/db';

import { useRevalidateLectureMutation } from './mutation';

export const RevalidateLectureAction = ({ lecture }: { lecture: Lecture }) => {
	const mutation = useRevalidateLectureMutation(lecture);

	return (
		<Button
			size="sm"
			isLoading={mutation.isPending}
			onClick={() => {
				mutation.mutate(void 0, {
					onSuccess: () => {
						toast.success('Lecture revalidated');
					}
				});
			}}
		/>
	);
};
