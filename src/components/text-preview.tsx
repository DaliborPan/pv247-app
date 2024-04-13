import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const TextPreview = ({
	children,
	className
}: PropsWithChildren<{
	className?: string;
}>) => (
	<p
		className={cn(
			'mt-4 text-sm leading-6 text-gray-600 line-clamp-3',
			className
		)}
	>
		{children}
	</p>
);
