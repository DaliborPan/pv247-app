'use client';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import { type BaseObject } from '@/schema/base';

type TableProps<TData extends BaseObject> = {
	data: TData[];
	columns: ColumnDef<TData, string>[];
};

export const DataTable = <TData extends BaseObject>({
	data,
	columns
}: TableProps<TData>) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	return (
		<div className="overflow-x-auto">
			<table className="table w-full caption-bottom">
				<thead className="[&_tr]:bg-primary-100 [&_tr]:h-auto table-header-group h-auto">
					{table.getHeaderGroups().map(headerGroup => (
						<tr
							className="block transition-colors border-b"
							key={headerGroup.id}
						>
							{headerGroup.headers.map(header => (
								<th
									className="p-2 font-medium text-left text-primary"
									key={header.id}
									style={{ width: `${header.getSize()}px` }}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="">
					{table.getRowModel().rows.map(row => (
						<tr
							className="flex transition-colors border-b even:bg-white/50 odd:bg-white"
							key={row.id}
						>
							{row.getVisibleCells().map(cell => (
								<td
									className="inline-block p-2 antialiased text-left align-middle"
									key={cell.id}
									style={{ width: `${cell.column.getSize()}px` }}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
