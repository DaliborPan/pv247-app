import { lectureLoaders } from '@/modules/lecture/loader';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';
import { ReactNode, Suspense } from 'react';
import { LectureType } from '@/modules/lecture/schema';
import { UserType } from '@/modules/user/schema';

import { homeworkLoader } from '@/modules/homework/loader';

const HomeworkListCard = async ({
  points
}: {
  points?: (lecture: LectureType) => ReactNode;
}) => {
  const lectures = await lectureLoaders.getMany();
  const availableLectures = await lectureLoaders.getAvailable();

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
      {props.user.then(async user => {
        if (user.role !== 'student') {
          return null;
        }

        const homework = await homeworkLoader.getMany({
          userId: user.id
        });

        return (
          <HomeworkListCard
            points={lecture => {
              const lectureHomework = homework.find(
                hw => hw.lectureId === lecture.id
              );

              return (
                <Suspense>
                  {homeworkLoader
                    .getGradingStatus(lecture.id)
                    .then(gradingStatus => (
                      <PointsBadge
                        points={lectureHomework?.points}
                        hasGradingStarted={gradingStatus.hasGradingStarted}
                      />
                    ))}
                </Suspense>
              );
            }}
          />
        );
      })}
    </Suspense>
  );
};
