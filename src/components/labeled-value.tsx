import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const LabeledValue = ({
	children,
	label,
	labelClassName,
	wrapperClassName
}: PropsWithChildren<{
	label: string;
	labelClassName?: string;
	valueClassName?: string;
	wrapperClassName?: string;
}>) => (
	<div className={cn('flex flex-col', wrapperClassName)}>
		<span className={cn('text-xs text-gray-500', labelClassName)}>{label}</span>
		{children}
	</div>
);
