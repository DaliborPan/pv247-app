import Link from 'next/link';
import { ExternalLink, Github, Lock, NotepadText } from 'lucide-react';

import { LectureType } from '../schema';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';
import { Suspense } from 'react';
import { getSession } from '@/modules/session-user';

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

          <Suspense>
            {getSession().then(sessionUser => {
              const homeworkGithubUrl = getHomeworkGithubUrl({
                githubName: sessionUser?.github ?? null,
                homeworkSlug: lecture.homeworkSlug
              });

              return (
                homeworkGithubUrl && (
                  <a href={homeworkGithubUrl} target="_blank" rel="noreferrer">
                    <Button
                      size="sm"
                      variant="outline/primary"
                      iconLeft={{ icon: <Github /> }}
                      title="Open your repository on GitHub"
                    >
                      GH repo
                    </Button>
                  </a>
                )
              );
            })}
          </Suspense>
        </>
      )}
    </div>
  );
};
