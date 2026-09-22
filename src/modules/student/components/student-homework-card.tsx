import {
  getAvailableLecturesCachedQuery,
  getLecturesCachedQuery
} from '@/modules/lecture/queries';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';
import { ReactNode, Suspense } from 'react';
import type { LectureType } from '@/modules/lecture/types';
import { type StudentType } from '@/modules/student/types';

import {
  getStudentHomeworksQuery,
  getHomeworkGradingStatusQuery
} from '@/modules/student-homework/queries';

const HomeworkListCard = async ({
  points
}: {
  points?: (lecture: LectureType) => ReactNode;
}) => {
  const lectures = await getLecturesCachedQuery();
  const availableLectures = await getAvailableLecturesCachedQuery();

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

export const StudentHomeworkCard = (props: {
  user: Promise<Pick<StudentType, 'id' | 'role'>>;
}) => {
  return (
    <Suspense fallback={<HomeworkListCard />}>
      {props.user.then(async user => {
        if (user.role !== 'student') {
          return null;
        }

        const homework = await getStudentHomeworksQuery(user.id);

        return (
          <HomeworkListCard
            points={lecture => {
              const lectureHomework = homework.find(
                hw => hw.lectureId === lecture.id
              );

              return (
                <Suspense>
                  {getHomeworkGradingStatusQuery(lecture.id).then(
                    ({ hasGradingStarted }) => (
                      <PointsBadge
                        points={lectureHomework?.points ?? undefined}
                        hasGradingStarted={hasGradingStarted}
                      />
                    )
                  )}
                </Suspense>
              );
            }}
          />
        );
      })}
    </Suspense>
  );
};
