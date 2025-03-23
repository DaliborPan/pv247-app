import { cn } from '@/lib/cn';
import { getUserOverviewLoader } from '@/modules/shared/server';
import { type User } from '@/db';
import { getOrderedLecturesLoader } from '@/modules/lecture/server';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';

export const StudentHomeworkCard = async ({ user }: { user: User }) => {
  const lectures = await getOrderedLecturesLoader();

  const {
    lectures: { userHomeworks, availableLength }
  } = await getUserOverviewLoader(user);

  return (
    <ListCard
      title="Homework"
      className={cn('flex-col items-start gap-2 lg:flex-row lg:items-center')}
      items={lectures
        .slice(0, availableLength + 1)
        .filter(lecture => !!lecture.homeworkSlug)}
      renderItem={(lecture, index) => {
        const homework = userHomeworks.find(
          homework => homework.lectureId === lecture.id
        );

        const points = homework?.points;

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
