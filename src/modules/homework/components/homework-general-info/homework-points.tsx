import Link from 'next/link';

import { Button } from '@/components/base/button';
import { type LectureType } from '@/modules/lecture/types';

import { LabeledItem } from './labeled-item';

import { getSession } from '@/modules/session-user';
import {
  getMyHomeworks,
  getHomeworkGradingStatus
} from '@/modules/homework/queries';
import { getHomeworkPointsMessage } from '../../utils';

export const HomeworkPoints = async ({
  lecture
}: {
  lecture: Pick<LectureType, 'id' | 'homeworkSlug'>;
}) => {
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

  const [homework, gradingStatus] = await Promise.all([
    getMyHomeworks(lecture.id),
    getHomeworkGradingStatus(lecture.id)
  ]);

  const homeworkRecord = homework.at(0);

  return (
    <LabeledItem label="Earned points">
      <div>
        {getHomeworkPointsMessage({
          points: homeworkRecord?.points,
          hasGradingStarted: gradingStatus.hasGradingStarted
        })}
      </div>
    </LabeledItem>
  );
};
