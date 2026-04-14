import { Github } from 'lucide-react';
import { lectureLoaders } from '@/modules/lecture/loader';

import { ListCard } from './list-card';
import { PointsBadge } from './points-badge';
import { ReactNode, Suspense } from 'react';
import { LectureType } from '@/modules/lecture/schema';
import { UserType } from '@/modules/user/schema';

import { homeworkLoader } from '@/modules/homework/loader';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';
import { Icon } from '@/components/base/icon';

const HomeworkListCard = async ({
  githubName,
  points
}: {
  githubName?: string | null;
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
      renderItem={(lecture, index) => {
        const homeworkGithubUrl = getHomeworkGithubUrl({
          githubName: githubName ?? null,
          homeworkSlug: lecture.homeworkSlug
        });

        return (
          <>
            <div className="grow">
              <span className="text-xs text-text-terciary">
                Homework {index + 1}
              </span>

              <div className="flex items-center gap-x-3">
                <h4>{lecture.homeworkName}</h4>

                {homeworkGithubUrl && (
                  <a
                    href={homeworkGithubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-x-1 text-sm text-primary transition-colors hover:text-primary-700 hover:underline"
                    title="Open repository on GitHub"
                  >
                    <Icon icon={<Github />} className="size-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              {points?.(lecture)}

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
            githubName={user.github}
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
