'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { type User } from '@/db';
import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';

import {
	SetHomeworkPointsForm,
	type SetHomeworkPointsFormSchema
} from './set-homework-points-form';

export const columns: ColumnDef<User, unknown>[] = [
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
				{cell.getValue() as string}
			</a>
		),

		enableSorting: true
	},
	{
		accessorKey: 'fullName',
		header: props => <DataTableColumnHeader {...props} title="Full name" />,
		minSize: 300,
		cell: cell => <div>{cell.getValue() as string}</div>,

		enableSorting: true
	},
	{
		accessorKey: 'defaultValues',
		header: props => (
			<DataTableColumnHeader {...props} title="Homework points" />
		),
		minSize: 225,
		cell: cell => {
			const defaultValues = cell.getValue() as SetHomeworkPointsFormSchema;

			return <SetHomeworkPointsForm defaultValues={defaultValues} />;
		}
	}
];
