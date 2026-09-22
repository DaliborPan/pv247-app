import Link from 'next/link';
import { Github, Lock, NotepadText } from 'lucide-react';

import { type LectureType } from '@/modules/lecture/types';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button/button';
import { Suspense } from 'react';
import { getSession } from '@/modules/session-user/session-user';
import { getStudentHomeworksQuery } from '@/modules/student-homework/queries';
import { CreateHomeworkRepositoryAction } from '@/modules/student-homework/components/create-homework-repository-action/create-homework-repository-action';

export const HomeworkCardActions = ({ lecture }: { lecture: LectureType }) => {
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
          <Suspense>
            {getSession().then(async sessionUser => {
              const studentHomework = sessionUser
                ? (await getStudentHomeworksQuery(sessionUser.id)).find(
                    item => item.lectureId === lecture.id
                  )
                : undefined;
              const homeworkGithubUrl =
                studentHomework?.status === 'ready'
                  ? studentHomework.repositoryUrl
                  : undefined;

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
                    studentHomework?.status !== 'ready' && (
                      <CreateHomeworkRepositoryAction
                        lectureId={lecture.id}
                        status={studentHomework?.status}
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
