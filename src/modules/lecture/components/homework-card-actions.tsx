import Link from 'next/link';
import { ExternalLink, Github, Lock, NotepadText } from 'lucide-react';

import { type LectureType } from '@/modules/lecture/types';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';
import { Suspense } from 'react';
import { getSession } from '@/modules/session-user';
import { getStudentHomeworkRepositoriesQuery } from '@/modules/homework-repository/queries';
import { CreateHomeworkRepositoryAction } from '@/modules/homework-repository/components/create-homework-repository-action/create-homework-repository-action';

export const HomeworkCardActions = ({
  lecture
}: {
  lecture: LectureType;
}) => {
  return (
    <div className="flex grow gap-x-2">
      <Link
        href={`/homeworks/${lecture.homeworkSlug}`}
        className={cn(
          'grow lg:grow-0',
          !lecture.isAvailable && 'pointer-events-none'
        )}
      >
        <Button
          size="sm"
          className="w-full lg:w-auto"
          iconLeft={{ icon: !lecture.isAvailable ? <Lock /> : <NotepadText /> }}
          disabled={!lecture.isAvailable}
        >
          Learn more
        </Button>
      </Link>

      {lecture.isAvailable && (
        <>
          {!lecture.homeworkTemplateRepositoryUrl && (
            <a
              href={lecture.homeworkClassroomLink}
              target="_blank"
              rel="noreferrer"
              className="grow lg:grow-0"
            >
              <Button
                size="sm"
                className="w-full lg:w-auto"
                iconLeft={{ icon: <ExternalLink /> }}
                variant="outline/primary"
              >
                GH classroom
              </Button>
            </a>
          )}

          <Suspense>
            {getSession().then(async sessionUser => {
              const repository = sessionUser
                ? (
                    await getStudentHomeworkRepositoriesQuery(
                      sessionUser.id
                    )
                  ).find(item => item.lectureId === lecture.id)
                : undefined;
              const homeworkGithubUrl =
                repository?.status === 'ready'
                  ? repository.repositoryUrl
                  : lecture.homeworkTemplateRepositoryUrl || repository
                    ? undefined
                    : getHomeworkGithubUrl({
                        githubName: sessionUser?.github ?? null,
                        homeworkSlug: lecture.homeworkSlug
                      });

              return (
                <>
                  {homeworkGithubUrl && (
                    <a
                      href={homeworkGithubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        size="sm"
                        variant="outline/primary"
                        iconLeft={{ icon: <Github /> }}
                        title="Open your repository on GitHub"
                      >
                        GH repo
                      </Button>
                    </a>
                  )}
                  {sessionUser?.role === 'student' &&
                    lecture.homeworkTemplateRepositoryUrl &&
                    repository?.status !== 'ready' && (
                      <CreateHomeworkRepositoryAction
                        lectureId={lecture.id}
                        status={repository?.status}
                      />
                    )}
                </>
              );
            })}
          </Suspense>
        </>
      )}
    </div>
  );
};
