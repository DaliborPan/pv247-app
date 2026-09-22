'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Icon } from '@/components/base/icon/icon';
import { SetHomeworkPointsForm } from '@/modules/student-homework/components/set-homework-points-form/set-homework-points-form';
import type { SetHomeworkPointsFormSchema } from '@/modules/student-homework/components/set-homework-points-form/schema';
import { type StudentHomeworkStudentType } from '@/modules/student/types';

const columnHelper = createColumnHelper<
  StudentHomeworkStudentType & {
    defaultValues: Partial<SetHomeworkPointsFormSchema>;
    repositoryUrl?: string | null;
    canGrade: boolean;
  }
>();

export const columns = [
  columnHelper.display({
    id: 'github-external-link',
    header: props => <DataTableColumnHeader {...props} title="GitHub" />,
    minSize: 200,
    cell: ({ row }) => {
      const url = row.original.repositoryUrl;
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
      row.original.canGrade && (
        <SetHomeworkPointsForm defaultValues={row.original.defaultValues} />
      )
  })
];
