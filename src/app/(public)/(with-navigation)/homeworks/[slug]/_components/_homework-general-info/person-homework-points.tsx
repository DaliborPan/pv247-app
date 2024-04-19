'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { getHomeworkPointsAction } from './get-homework-points-action';

const useHomeworkPointsQuery = (lectureId: string, userId?: string) =>
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

export const PersonHomeworkPoints = ({ lectureId }: { lectureId: string }) => {
	const session = useSession();
	const { data } = useHomeworkPointsQuery(lectureId, session.data?.user.id);

	if (!data) return null;

	return (
		<div>{data?.status === 'pending' ? 'Not scored yet' : data?.points}</div>
	);
};
