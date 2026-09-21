import { ExternalLink, Github } from 'lucide-react';

import { getStudentHomeworkRepositoriesQuery } from '@/modules/homework-repository/queries';
import { getSession } from '@/modules/session-user/session-user';

export const HomeworkRepositoryLink = async ({
  lectureId
}: {
  lectureId: string;
}) => {
  const sessionUser = await getSession();

  if (sessionUser?.role !== 'student') return null;

  const repository = (await getStudentHomeworkRepositoriesQuery(sessionUser.id)).find(
    repository => repository.lectureId === lectureId
  );

  if (repository?.status !== 'ready' || !repository.repositoryUrl) return null;

  return (
    <a
      href={repository.repositoryUrl}
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
};
