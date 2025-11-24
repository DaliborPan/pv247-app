import { cn } from '@/lib/cn';
import { lectureLoaders } from '@/modules/lecture/loader';
import { type UserType } from '@/modules/user/schema';

import { studentLoaders } from '../loader';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';

export const StudentHomeworkCard = async ({ user }: { user: UserType }) => {
  const lectures = await lectureLoaders.getOrdered();
  const availableLectures = lectures.filter(checkIsAvailable);

  const { homework } = await studentLoaders.getOverview(user);

  return (
    <ListCard
      title="Homework"
      className={cn('flex-col items-start gap-2 lg:flex-row lg:items-center')}
      items={lectures
        .slice(0, availableLectures.length + 1)
        .filter(lecture => !!lecture.homeworkSlug)}
      renderItem={(lecture, index) => {
        const userHomework = homework.find(hw => hw.lectureId === lecture.id);
        const points = userHomework?.points;

        return (
          <>
            <div className="grow">
              <span className="text-xs text-text-terciary">
                Homework {index + 1}
              </span>

              <h4>{lecture.homeworkName}</h4>
            </div>

            <div className="flex items-center gap-x-2">
              <PointsBadge points={points} />
              <span className="text-sm text-primary-500">
                / {lecture.homeworkMaxPoints}
              </span>
            </div>
          </>
        );
      }}
    />
  );
};
