'use client';

import {
  type ColumnDef,
  type SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { Input } from '../base/input';

type TableProps<TData extends { id: string }> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  search?: {
    name: string;
  };

  defaultSorting?: SortingState;
  defaultColumnVisibility?: VisibilityState;
};

export const DataTable = <TData extends { id: string }>({
  data,
  columns,
  search,
  defaultSorting,
  defaultColumnVisibility
}: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: defaultSorting,
      columnVisibility: defaultColumnVisibility
    }
  });

  const searchColumn = table.getColumn(search?.name ?? '');

  const searchFilterValue = searchColumn?.getFilterValue() as
    | string
    | undefined;

  return (
    <div className="flex flex-col gap-y-4">
      {searchColumn && (
        <div className="w-96">
          <Input
            placeholder="Adam Grygar"
            value={searchFilterValue ?? ''}
            onChange={e => searchColumn.setFilterValue(e.target.value)}
            iconLeft={{ icon: <Search /> }}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full caption-bottom">
          <thead className="table-header-group h-auto [&_tr]:h-auto [&_tr]:bg-primary-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                className="block border-b transition-colors"
                key={headerGroup.id}
              >
                {headerGroup.headers.map(header => (
                  <th
                    className="p-2 text-left font-medium text-primary"
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
                className="flex items-center border-b transition-colors odd:bg-white even:bg-white/50"
                key={row.id}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    className="inline-block p-2 text-left align-middle antialiased"
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
    </div>
  );
};
