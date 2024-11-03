'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { ExternalLink, X } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';
import { orderedHomeworkSlugs } from '@/modules/lecture/const';
import { type GetStudentsWithHomeworksResult } from '@/modules/student/server';
import {
  SetHomeworkPointsForm,
  type SetHomeworkPointsFormSchema
} from '@/modules/homework/components';

export const columns: ColumnDef<
  GetStudentsWithHomeworksResult[number] & {
    defaultValues: Partial<SetHomeworkPointsFormSchema>;
  },
  unknown
>[] = [
  {
    id: 'github-link',
    header: props => <DataTableColumnHeader {...props} title="GitHub" />,
    minSize: 175,
    cell: ({ row }) => {
      const homeworkSlug = row.original.defaultValues?.lecture?.homeworkSlug;
      const githubName = row.original.github;

      const order = homeworkSlug
        ? orderedHomeworkSlugs.indexOf(homeworkSlug) + 1
        : undefined;

      const url =
        order && githubName
          ? `https://github.com/FI-PV247/t-0${order}-${homeworkSlug}-${githubName}`
          : undefined;

      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center font-light gap-x-2 hover:text-primary hover:underline"
        >
          <Icon icon={<ExternalLink />} />
          Link
        </a>
      ) : (
        <div className="flex items-center gap-x-2 text-gray-500">
          <Icon icon={<X />} />
          No link
        </div>
      );
    }
  },
  {
    accessorKey: 'lastName',
    header: props => <DataTableColumnHeader {...props} title="Full name" />,
    minSize: 300,
    cell: ({ row }) =>
      row.original.firstName && row.original.lastName
        ? `${row.original.firstName} ${row.original.lastName}`
        : ''
  },
  {
    accessorKey: 'github',
    header: props => <DataTableColumnHeader {...props} title="Github nick" />,
    minSize: 300,
    cell: ({ row }) => row.original.github
  },
  {
    id: 'defaultValues',
    header: props => (
      <DataTableColumnHeader {...props} title="Homework points" />
    ),
    minSize: 225,
    cell: ({ row }) => (
      <SetHomeworkPointsForm defaultValues={row.original.defaultValues} />
    )
  }
];
