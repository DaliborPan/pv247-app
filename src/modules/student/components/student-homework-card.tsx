import { getUserOverview } from '@/modules/shared/server';
import { getOrderedLectures } from '@/modules/lecture/server';
import { cn } from '@/lib/cn';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';

export const StudentHomeworkCard = async ({
  userId,
  projectId
}: {
  userId: string;
  projectId: string | null;
}) => {
  const lectures = await getOrderedLectures();

  const {
    lectures: { userHomeworks, availableLength }
  } = await getUserOverview(userId, projectId);

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
