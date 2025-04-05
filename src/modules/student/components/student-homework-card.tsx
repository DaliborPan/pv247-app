import { cn } from '@/lib/cn';
import { getOrderedLecturesLoader } from '@/modules/lecture/loader';
import { type UserType } from '@/modules/user/schema';

import { getStudentOverviewLoader } from '../loader';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';

export const StudentHomeworkCard = async ({ user }: { user: UserType }) => {
  const lectures = await getOrderedLecturesLoader();

  const {
    lectures: { userHomeworks, availableLength }
  } = await getStudentOverviewLoader(user);

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
