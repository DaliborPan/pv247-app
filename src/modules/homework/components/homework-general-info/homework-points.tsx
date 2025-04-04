'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

import { type Lecture } from '@/db';
import { Button } from '@/components/base/button';

import { getHomeworkPointsAction } from './action';
import { LabeledItem } from './labeled-item';

/**
 * Using useQuery because we need to be able to prerender SSG
 */
const usePersonHomeworkPointsQuery = (lectureId: string) => {
  const session = useSession();

  return useQuery({
    queryKey: ['homework-points', lectureId, session.data?.user.id],
    enabled: !!session.data?.user.id,
    queryFn: async () => {
      const [data, error] = await getHomeworkPointsAction({ lectureId });

      if (error) {
        toast.error(error.message);
        return;
      }

      return data;
    }
  });
};

export const HomeworkPoints = ({ lecture }: { lecture: Lecture }) => {
  const session = useSession();
  const { isSuccess, data } = usePersonHomeworkPointsQuery(lecture.id);

  if (!isSuccess) return null;

  return session.data?.user.role === 'lector' ? (
    <div className="flex justify-end">
      <Link href={`/lector/homeworks/${lecture.homeworkSlug}`}>
        <Button>Set points</Button>
      </Link>
    </div>
  ) : (
    <LabeledItem label="Earned points">
      <div>{!data ? 'Not scored yet' : `${data.points} points`}</div>
    </LabeledItem>
  );
};
