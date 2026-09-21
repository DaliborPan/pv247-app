import Link from 'next/link';
import { CircleHelp } from 'lucide-react';

import { Button } from '@/components/base/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/base/tooltip/tooltip';
import { type LectureType } from '@/modules/lecture/types';

import { LabeledItem } from './labeled-item';

import { getSession } from '@/modules/session-user/session-user';
import {
  getMyHomeworksQuery,
  getHomeworkGradingStatusQuery
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
    getMyHomeworksQuery(lecture.id),
    getHomeworkGradingStatusQuery(lecture.id)
  ]);

  const homeworkRecord = homework.at(0);
  const hasPoints = homeworkRecord?.points !== undefined;
  const gradingHasNotStarted = !hasPoints && !gradingStatus.hasGradingStarted;

  return (
    <LabeledItem label="Earned points">
      <div className="flex items-center gap-1">
        {gradingHasNotStarted
          ? 'N/A'
          : getHomeworkPointsMessage({
              points: homeworkRecord?.points,
              hasGradingStarted: gradingStatus.hasGradingStarted
            })}
        {gradingHasNotStarted && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Grading hasn't started yet"
                className="text-text-terciary"
              >
                <CircleHelp className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Grading hasn't started yet</TooltipContent>
          </Tooltip>
        )}
      </div>
    </LabeledItem>
  );
};
