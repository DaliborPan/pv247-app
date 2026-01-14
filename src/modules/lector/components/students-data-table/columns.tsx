'use client';

import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { ArrowRight, ExternalLink, X } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';

import { type studentLoaders } from '@/modules/student/loader';

import { LoaderResult } from '@/types';
import { cn } from '@/lib/cn';

const columnHelper =
  createColumnHelper<
    LoaderResult<typeof studentLoaders.listStudents>[number]
  >();

const StatusBadge = ({ success }: { success: boolean }) => {
  return (
    <div
      className={cn(
        'size-3 rounded-full',
        success ? 'bg-green-500' : 'bg-red-500'
      )}
    />
  );
};

export const columns = [
  columnHelper.display({
    id: 'github-link',
    header: props => <DataTableColumnHeader {...props} title="GitHub" />,
    size: 175,
    cell: ({ row }) =>
      row.original.github ? (
        <a
          href={`https://github.com/${row.original.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-x-2 font-light hover:text-primary hover:underline"
        >
          <Icon icon={<ExternalLink />} />
          {row.original.github}
        </a>
      ) : (
        <span className="italic text-text-terciary">
          {row.original.name ?? row.original.lastName}
        </span>
      )
  }),

  columnHelper.accessor('firstName', {
    header: props => <DataTableColumnHeader {...props} title="First name" />
  }),

  columnHelper.accessor('lastName', {
    header: props => <DataTableColumnHeader {...props} title="Last name" />
  }),

  columnHelper.display({
    id: 'fullname',
    filterFn: (row, _columnId, filterValue) => {
      const fullName =
        `${row.original.firstName} ${row.original.lastName}`.toLowerCase();

      return fullName.includes(filterValue.toLowerCase());
    }
  }),

  columnHelper.accessor('project.name', {
    header: props => <DataTableColumnHeader {...props} title="Project" />,
    size: 220,
    cell: ({ row }) =>
      row.original.project ? (
        <div className="truncate">
          <Link
            href={`/lector/projects/${row.original.projectId}`}
            className="hover:text-primary hover:underline"
          >
            {row.original.project.name}
          </Link>
        </div>
      ) : (
        <Icon icon={<X />} />
      )
  }),

  columnHelper.accessor('homeworkPoints', {
    header: props => (
      <DataTableColumnHeader {...props} title="Homework points" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-x-2">
        <span>{row.original.homeworkPoints}</span>
        <StatusBadge success={row.original.hasEnoughHomeworkPoints} />
      </div>
    )
  }),

  columnHelper.accessor('attendanceCount', {
    header: props => <DataTableColumnHeader {...props} title="Attendance" />,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-x-2">
        <span>{row.original.studentLectures.length}</span>
        <StatusBadge success={row.original.hasEnoughAttendance} />
      </div>
    )
  }),

  columnHelper.display({
    id: 'open',
    minSize: 100,
    cell: ({ row }) => (
      <Link
        href={`/lector/student-detail/${row.original.id}`}
        className="ml-8 flex items-center gap-x-2 hover:text-primary hover:underline"
      >
        <span>Open</span>
        <Icon icon={<ArrowRight />} />
      </Link>
    )
  })
];
