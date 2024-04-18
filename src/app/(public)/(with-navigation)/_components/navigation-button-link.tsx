import Link from 'next/link';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { cn } from '@/lib/cn';

export const NavigationButtonLink = ({
	type,
	href,
	name
}: {
	type: 'previous' | 'next';
	href: string;
	name: string;
}) => {
	const iconName = type === 'previous' ? 'ChevronLeft' : 'ChevronRight';

	return (
		<Link href={href}>
			<Button
				variant="ghost"
				className="flex flex-col items-start h-auto py-4 font-normal hover:bg-white hover:shadow"
			>
				<span
					className={cn(
						'text-sm text-gray-600',
						type === 'previous' && 'md:pl-6'
					)}
				>
					{type === 'previous' ? 'Previous' : 'Next'}
				</span>
				<div
					className={cn(
						'flex items-center font-medium md:gap-x-2',
						type === 'next' && 'flex-row-reverse'
					)}
				>
					<Icon name={iconName} className="hidden md:block" />
					<span>{name}</span>
				</div>
			</Button>
		</Link>
	);
};
