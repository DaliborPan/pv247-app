import { cn } from '@/lib/cn';
import { type BaseObject } from '@/schema/base';

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
	<div className="p-8 mx-6 mt-8 bg-white rounded-lg shadow-lg">
		<h3 className="mb-4 text-xl">{title}</h3>

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
	</div>
);
