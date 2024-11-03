'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, X } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';
import { type GetStudentsWithHomeworksResult } from '@/modules/student/server';

export const columns: ColumnDef<
  GetStudentsWithHomeworksResult[number] & {
    homeworkPoints: number;
  },
  string
>[] = [
  {
    id: 'github-link',
    header: props => <DataTableColumnHeader {...props} title="GitHub" />,
    minSize: 175,
    cell: ({ row }) => (
      <a
        href={`https://github.com/${row.original.github}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center font-light gap-x-2 hover:text-primary hover:underline"
      >
        <Icon icon={<ExternalLink />} />
        {row.original.github ?? row.original.name ?? row.original.lastName}
      </a>
    )
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
    accessorKey: 'projectId',
    header: props => <DataTableColumnHeader {...props} title="Has project" />,
    minSize: 175,
    cell: ({ row }) => (
      <div>
        <Icon icon={row.original.projectId ? <Check /> : <X />} />
      </div>
    )
  },
  {
    accessorKey: 'homeworkPoints',
    header: props => (
      <DataTableColumnHeader {...props} title="Homework points" />
    ),
    minSize: 225,
    cell: ({ getValue }) => `${getValue()} / 210`
  },
  {
    id: 'id',
    header: '',
    minSize: 100,
    cell: ({ row }) => (
      <Link
        href={`/lector/student-detail/${row.original.id}`}
        className="flex items-center hover:underline gap-x-2 hover:text-primary "
      >
        <span>Open</span>
        <Icon icon={<ArrowRight />} />
      </Link>
    )
  }
];
