'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { type Lecture, type User } from '@/db';
import { DataTableColumnHeader } from '@/components/data-table';
import { Icon } from '@/components/base/icon';
import { orderedHomeworkSlugs } from '@/modules/lecture/const';

import {
	SetHomeworkPointsForm,
	type SetHomeworkPointsFormSchema
} from './set-homework-points-form';

export const columns: ColumnDef<User, unknown>[] = [
	{
		accessorKey: 'name',
		header: props => <DataTableColumnHeader {...props} title="GitHub" />,
		minSize: 175,
		cell: cell => {
			const row = cell.row.original as User & {
				defaultValues: { lecture?: Lecture };
			};

			const homeworkSlug = row.defaultValues.lecture?.homeworkSlug;
			const githubName = row.github;

			const order = homeworkSlug
				? orderedHomeworkSlugs.indexOf(homeworkSlug) + 1
				: undefined;

			const url =
				order && githubName
					? `https://github.com/FI-PV247/t-0${order}-${homeworkSlug}-${githubName}`
					: undefined;

			// https://github.com/FI-PV247/t-01-typescript-kabourek-p

			return url ? (
				<a
					href={url}
					target="_blank"
					rel="noreferrer"
					className="flex items-center font-light gap-x-2 hover:text-primary hover:underline"
				>
					<Icon name="ExternalLink" />
					Link
				</a>
			) : (
				<div className="flex items-center gap-x-2 text-gray-500">
					<Icon name="X" />
					No link
				</div>
			);
		},

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
		accessorKey: 'github',
		header: props => <DataTableColumnHeader {...props} title="Github nick" />,
		minSize: 300,
		cell: cell => <div>{cell.getValue() as string}</div>,

		enableSorting: false
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
