import { Title } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';

import { cn } from '@/lib/cn';

export const DialogTitle = forwardRef<
	React.ElementRef<typeof Title>,
	React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
	<Title
		ref={ref}
		className={cn('text-lg font-medium leading-none tracking-tight', className)}
		{...props}
	/>
));
