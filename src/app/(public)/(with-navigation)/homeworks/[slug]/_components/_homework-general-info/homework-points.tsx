'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';

import { type Lecture } from '@/db';
import { Button } from '@/components/base/button';

import { getHomeworkPointsAction } from './get-homework-points-action';
import { LabeledItem } from './labeled-item';

const usePersonHomeworkPointsQuery = (lectureId: string, userId?: string) =>
	useQuery({
		queryKey: ['homework-points', userId],
		enabled: !!userId,
		queryFn: async () => {
			const result = await getHomeworkPointsAction(lectureId);

			if (result.status === 'error') {
				toast.error(result.message);

				return;
			}

			return result;
		}
	});

export const HomeworkPoints = ({ lecture }: { lecture: Lecture }) => {
	const session = useSession();
	const { data } = usePersonHomeworkPointsQuery(
		lecture.id,
		session.data?.user.id
	);

	if (!data) return null;

	return session.data?.user.role === 'lector' ? (
		<div className="flex justify-end">
			<Link href={`/lector/homeworks/${lecture.homeworkSlug}`}>
				<Button>Set points</Button>
			</Link>
		</div>
	) : (
		<LabeledItem label="Earned points">
			<div>{data?.status === 'pending' ? 'Not scored yet' : data?.points}</div>
		</LabeledItem>
	);
};
