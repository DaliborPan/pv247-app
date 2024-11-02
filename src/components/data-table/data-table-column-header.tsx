import { type Column } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/cn';

import { Icon } from '../base/icon';

type DataTableColumnHeaderProps<TData, TValue> = {
	className?: string;
	column: Column<TData, TValue>;
	title: React.ReactNode;
};

export const DataTableColumnHeader = <TData, TValue>({
	column,
	title,
	className
}: DataTableColumnHeaderProps<TData, TValue>) => {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn('flex justify-between items-center', className)}>
			<button
				onClick={() => {
					if (column.getIsSorted() === 'desc') {
						column.toggleSorting(false);
					} else if (column.getIsSorted() === 'asc') {
						column.clearSorting();
					} else {
						column.toggleSorting(true);
					}
				}}
			>
				{title}
			</button>

			{column.getIsSorted() !== false && (
				<div className="mt-0 ml-2 mr-6">
					<Icon
						icon={
							column.getIsSorted() === 'desc' ? <ChevronDown /> : <ChevronUp />
						}
					/>
				</div>
			)}
		</div>
	);
};
