'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, X } from 'lucide-react';

import { type User } from '@/db';
import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';

export const columns: ColumnDef<User, string>[] = [
	{
		accessorKey: 'name',
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
		),

		enableSorting: true
	},
	{
		accessorKey: 'fullName',
		header: props => <DataTableColumnHeader {...props} title="Full name" />,
		minSize: 300,
		cell: cell => <div>{cell.getValue()}</div>,

		enableSorting: true
	},
	{
		accessorKey: 'projectId',
		header: props => <DataTableColumnHeader {...props} title="Has project" />,
		minSize: 175,
		cell: cell => (
			<div>
				<Icon icon={cell.getValue() ? <Check /> : <X />} />
			</div>
		),

		enableSorting: true
	},
	// {
	// 	accessorKey: 'attendance',
	// 	header: props => <DataTableColumnHeader {...props} title="Attendance" />,
	// 	minSize: 175,
	// 	cell: cell => <div>{cell.getValue()}/10</div>,

	// 	enableSorting: true
	// },
	{
		accessorKey: 'homeworkPoints',
		header: props => (
			<DataTableColumnHeader {...props} title="Homework points" />
		),
		minSize: 225,
		cell: cell => <div>{cell.getValue()}/210</div>,

		enableSorting: true
	},
	{
		accessorKey: 'id',
		header: '',
		minSize: 100,
		cell: cell => (
			<Link
				href={`/lector/student-detail/${cell.getValue()}`}
				className="flex items-center hover:underline gap-x-2 hover:text-primary "
			>
				<span>Open</span>
				<Icon icon={<ArrowRight />} />
			</Link>
		)
	}
];
