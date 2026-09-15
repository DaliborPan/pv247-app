'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';
import {
  SetHomeworkPointsForm,
  type SetHomeworkPointsFormSchema
} from '@/modules/homework/components/set-homework-points-form';
import { type studentLoaders } from '@/modules/student/loader';
import { LoaderResult } from '@/types';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';
import { CreateHomeworkRepositoryAction } from '@/modules/homework-repository/components/create-homework-repository-action/create-homework-repository-action';

const columnHelper = createColumnHelper<
  LoaderResult<typeof studentLoaders.getStudentsWithHomework>[number] & {
    defaultValues: Partial<SetHomeworkPointsFormSchema>;
    templateRepositoryUrl?: string | null;
  }
>();

export const columns = [
  columnHelper.display({
    id: 'github-external-link',
    header: props => <DataTableColumnHeader {...props} title="GitHub" />,
    minSize: 200,
    cell: ({ row }) => {
      const lecture = row.original.defaultValues.lecture;
      const repository = row.original.homeworkRepositories[0];
      if (row.original.templateRepositoryUrl || repository) {
        return (
          <div className="flex flex-col items-start gap-2">
            {repository?.repositoryUrl && (
              <a
                href={repository.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Open repository
              </a>
            )}
            {repository?.status === 'ready' ? (
              repository.invitationId && (
                <span className="text-xs text-text-terciary">
                  Invitation sent
                </span>
              )
            ) : lecture?.id ? (
              <CreateHomeworkRepositoryAction
                lectureId={lecture.id}
                studentId={row.original.id}
                exists={!!repository?.githubRepositoryId}
                retry={!!repository}
              />
            ) : null}
            {repository?.lastError && (
              <p className="max-w-xs text-sm text-red-700" role="status">
                {repository.lastError}
              </p>
            )}
          </div>
        );
      }
      const homeworkSlug = row.original.defaultValues?.lecture?.homeworkSlug;
      const githubName = row.original.github;
      const url = getHomeworkGithubUrl({
        githubName,
        homeworkSlug
      });
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-x-2 font-light hover:text-primary hover:underline"
        >
          <Icon icon={<ExternalLink />} />
          Link
        </a>
      ) : (
        <div className="italic text-text-terciary">
          {row.original.name ?? row.original.lastName}
        </div>
      );
    }
  }),

  columnHelper.accessor('firstName', {
    header: props => <DataTableColumnHeader {...props} title="First name" />
  }),

  columnHelper.accessor('lastName', {
    header: props => <DataTableColumnHeader {...props} title="Last name" />
  }),

  columnHelper.accessor('github', {
    header: props => <DataTableColumnHeader {...props} title="Github nick" />,
    minSize: 300,
    cell: ({ row }) => row.original.github
  }),

  columnHelper.display({
    id: 'points',
    header: props => <DataTableColumnHeader {...props} title="Points" />,
    minSize: 225,
    cell: ({ row }) =>
      !!row.original.github && (
        <SetHomeworkPointsForm defaultValues={row.original.defaultValues} />
      )
  })
];
