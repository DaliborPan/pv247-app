import Link from 'next/link';

import { Button } from '@/components/base/button';
import { type LectureType } from '@/modules/lecture/schema';

import { LabeledItem } from './labeled-item';

import { getSession } from '@/modules/session-user';
import { homeworkLoader } from '../../loader';

export const HomeworkPoints = async ({ lecture }: { lecture: LectureType }) => {
  const sessionUser = await getSession();

  if (!sessionUser) return null;

  if (sessionUser.role === 'lector') {
    return (
      <div className="flex justify-end">
        <Link href={`/lector/homeworks/${lecture.homeworkSlug}`}>
          <Button>Set points</Button>
        </Link>
      </div>
    );
  }

  const homework = (
    await homeworkLoader.getMine({
      lectureId: lecture.id
    })
  ).at(0);

  return (
    <LabeledItem label="Earned points">
      <div>{!homework ? 'Not scored yet' : `${homework.points} points`}</div>
    </LabeledItem>
  );
};
