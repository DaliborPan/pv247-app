import { cn } from '@/lib/cn';
import { type BaseObject } from '@/schema/base';

import { DetailCard } from '../detail-card';

type ListCardProps<T extends BaseObject> = {
	title: string;
	items: T[];
	renderItem: (item: T, index: number) => React.ReactNode;

	className?: string;
};

export const ListCard = async <T extends BaseObject>({
	title,
	items,
	renderItem,
	className
}: ListCardProps<T>) => (
	<DetailCard title={title}>
		<div className="flex flex-col gap-y-2">
			{items.map((item, index) => (
				<div
					key={item.id}
					className={cn(
						'flex items-center p-4 rounded-md bg-primary-100',
						className
					)}
				>
					{renderItem(item, index)}
				</div>
			))}
		</div>
	</DetailCard>
);
