'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Icon } from '@/components/base/icon/icon';
import {
  SetHomeworkPointsForm
} from '@/modules/homework/components/set-homework-points-form/set-homework-points-form';
import type { SetHomeworkPointsFormSchema } from '@/modules/homework/components/set-homework-points-form/schema';
import { type StudentHomeworkType } from '@/modules/student/types';
import { getHomeworkGithubUrl } from '@/modules/homework/utils';

const columnHelper = createColumnHelper<
  StudentHomeworkType & {
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
      if (row.original.templateRepositoryUrl) {
        return (
          <div className="italic text-text-terciary">
            {row.original.name ?? row.original.lastName}
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
