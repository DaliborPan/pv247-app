import { lectureLoaders } from '@/modules/lecture/loader';

import { studentLoaders } from '../loader';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';
import { ReactNode, Suspense } from 'react';
import { LectureType } from '@/modules/lecture/schema';
import { UserType } from '@/modules/user/schema';

const HomeworkListCard = async ({
  points
}: {
  points?: (lecture: LectureType) => ReactNode;
}) => {
  const lectures = await lectureLoaders.getOrdered();
  const availableLectures = await lectureLoaders.getAvailableLectures();

  return (
    <ListCard
      title="Homework"
      items={lectures
        .slice(0, availableLectures.length + 1)
        .filter(lecture => !!lecture.homeworkSlug)}
      renderItem={(lecture, index) => (
        <>
          <div className="grow">
            <span className="text-xs text-text-terciary">
              Homework {index + 1}
            </span>

            <h4>{lecture.homeworkName}</h4>
          </div>

          <div className="flex items-center gap-x-2">
            {points?.(lecture)}

            <span className="text-sm text-primary-500">
              / {lecture.homeworkMaxPoints}
            </span>
          </div>
        </>
      )}
    />
  );
};

export const StudentHomeworkCard = (props: { user: Promise<UserType> }) => {
  return (
    <Suspense fallback={<HomeworkListCard />}>
      {props.user.then(user => {
        if (user.role !== 'student') {
          return null;
        }

        const overviewPromise = studentLoaders.getOverview(user);

        return (
          <HomeworkListCard
            points={lecture => (
              <Suspense>
                {overviewPromise.then(overview => {
                  const userHomework = overview.homework.find(
                    hw => hw.lectureId === lecture.id
                  );
                  const points = userHomework?.points;

                  return <PointsBadge points={points} />;
                })}
              </Suspense>
            )}
          />
        );
      })}
    </Suspense>
  );
};
