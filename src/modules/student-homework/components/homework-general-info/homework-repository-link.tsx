import { ExternalLink, Github } from 'lucide-react';
import { Suspense } from 'react';

import { Skeleton } from '@/components/skeleton';
import { getSession } from '@/modules/session-user/session-user';
import { CreateHomeworkRepositoryAction } from '@/modules/student-homework/components/create-homework-repository-action/create-homework-repository-action';
import { getStudentHomeworksQuery } from '@/modules/student-homework/queries';
import { type StudentHomeworkType } from '@/modules/student-homework/types';

const RepositoryCard = ({
  lectureId,
  studentHomework,
  isLoading = false
}: {
  lectureId: string;
  studentHomework?: StudentHomeworkType;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-primary bg-primary-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Github className="size-7 shrink-0 text-primary" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-9 w-36" />
      </div>
    );
  }

  if (studentHomework?.status === 'ready') {
    if (!studentHomework.repositoryUrl) return null;

    return (
      <a
        href={studentHomework.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-primary bg-primary-100 p-5 transition-colors hover:bg-primary-200"
      >
        <div className="flex items-center gap-4">
          <Github className="size-7 text-primary" />
          <div>
            <p className="font-medium text-text-primary-color">
              Your GitHub repository
            </p>
            <p className="text-sm text-text-terciary">
              Open the repository for this homework
            </p>
          </div>
        </div>
        <ExternalLink className="size-5 shrink-0 text-primary" />
      </a>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg border border-primary bg-primary-100 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Github className="size-7 shrink-0 text-primary" />
        <div>
          <p className="font-medium text-text-primary-color">
            Your GitHub repository
          </p>
          <p className="text-sm text-text-terciary">
            Create a private repository for this homework
          </p>
        </div>
      </div>
      <CreateHomeworkRepositoryAction
        lectureId={lectureId}
        status={studentHomework?.status}
      />
    </div>
  );
};

const RepositoryCardAsync = async ({
  lectureId,
  studentHomeworkPromise
}: {
  lectureId: string;
  studentHomeworkPromise: Promise<StudentHomeworkType | undefined>;
}) => (
  <RepositoryCard
    lectureId={lectureId}
    studentHomework={await studentHomeworkPromise}
  />
);

export const HomeworkRepositoryLink = async ({
  lectureId
}: {
  lectureId: string;
}) => (
  <Suspense fallback={<RepositoryCard lectureId={lectureId} isLoading />}>
    {getSession().then(sessionUser => {
      if (sessionUser?.role !== 'student') return null;

      const studentHomeworkPromise = getStudentHomeworksQuery(
        sessionUser.id
      ).then(studentHomeworks =>
        studentHomeworks.find(
          studentHomework => studentHomework.lectureId === lectureId
        )
      );

      return (
        <RepositoryCardAsync
          lectureId={lectureId}
          studentHomeworkPromise={studentHomeworkPromise}
        />
      );
    })}
  </Suspense>
);
