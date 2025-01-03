import { DetailCard } from '@/components/detail-card';
import { cn } from '@/lib/cn';

type ListCardProps<T extends { id: string }> = {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;

  className?: string;
};

export const ListCard = async <T extends { id: string }>({
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
