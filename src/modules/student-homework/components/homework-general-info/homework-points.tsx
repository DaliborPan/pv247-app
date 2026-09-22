import { CircleHelp } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/base/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/base/tooltip/tooltip';
import { type LectureType } from '@/modules/lecture/types';
import { getSession } from '@/modules/session-user/session-user';
import {
  getMyHomeworksQuery,
  getHomeworkGradingStatusQuery
} from '@/modules/student-homework/queries';

import { getHomeworkPointsMessage } from '../../utils';
import { LabeledItem } from './labeled-item';

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

  const [studentHomeworks, gradingStatus] = await Promise.all([
    getMyHomeworksQuery(lecture.id),
    getHomeworkGradingStatusQuery(lecture.id)
  ]);

  const studentHomework = studentHomeworks.at(0);
  const hasPoints =
    studentHomework?.points !== undefined && studentHomework?.points !== null;
  const gradingHasNotStarted = !hasPoints && !gradingStatus.hasGradingStarted;

  return (
    <LabeledItem label="Earned points">
      <div className="flex items-center gap-1">
        {gradingHasNotStarted
          ? 'N/A'
          : getHomeworkPointsMessage({
              points: studentHomework?.points,
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
