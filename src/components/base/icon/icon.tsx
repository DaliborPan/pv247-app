import { icons, type LucideProps } from 'lucide-react';

import { cn } from '@/lib/cn';

export type IconProps = IconData & {
	slot?: string;
	wrapperClassName?: string;
};

export type IconName = keyof typeof icons;

export type IconData = {
	name: IconName;
	className?: string;
	onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
} & LucideProps;

export const Icon = ({
	name,
	wrapperClassName,
	className,
	...iconProps
}: IconProps) => {
	const LucideIcon = icons[name];

	return (
		<div className={cn('relative inline-block', wrapperClassName)}>
			<LucideIcon className={cn('size-4', className)} {...iconProps} />
		</div>
	);
};
