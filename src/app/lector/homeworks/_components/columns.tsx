'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { type Lecture, type User } from '@/db';
import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';

import { SetHomeworkPointsForm } from './set-homework-points-form';

export const columns: ColumnDef<User, string>[] = [
	{
		accessorKey: 'name',
		header: props => <DataTableColumnHeader {...props} title="GitHub" />,
		minSize: 175,
		cell: cell => (
			<a
				// TODO: correct link
				href={`https://github.com/${cell.getValue()}`}
				target="_blank"
				rel="noreferrer"
				className="flex items-center font-light gap-x-2 hover:text-primary hover:underline"
			>
				<Icon name="ExternalLink" />
				{cell.getValue()}
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
		accessorKey: 'points',
		header: props => (
			<DataTableColumnHeader {...props} title="Homework points" />
		),
		minSize: 225,
		cell: cell => <div>{cell.getValue()}</div>,

		enableSorting: true
	},
	{
		accessorKey: 'setPoints',
		header: 'Points',
		minSize: 100,
		cell: cell => {
			const defaultValues = cell.getValue() as unknown as {
				studentId: string;
				lecture: Lecture;
				lectorId: string;
				points?: number;
			};

			return <SetHomeworkPointsForm {...defaultValues} />;
		}
	}
];
