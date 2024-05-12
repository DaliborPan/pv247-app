'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type Lecture } from '@/db';
import { Button } from '@/components/base/button';

import { revalidateLectureAction } from './action';

const useRevalidateLectureMutation = (lecture: Lecture) =>
	useMutation({
		mutationFn: () => revalidateLectureAction(lecture),
		onSuccess: () => {
			toast.success('Lecture revalidated');
		}
	});

export const RevalidateLectureButton = ({ lecture }: { lecture: Lecture }) => {
	const mutation = useRevalidateLectureMutation(lecture);

	return (
		<Button
			size="sm"
			isLoading={mutation.isPending}
			onClick={() => mutation.mutate()}
			iconLeft={
				mutation.isPending
					? undefined
					: {
							name: 'RotateCcw'
						}
			}
		/>
	);
};
