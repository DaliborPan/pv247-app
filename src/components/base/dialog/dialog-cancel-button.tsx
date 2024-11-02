import { forwardRef } from 'react';
import { X } from 'lucide-react';

import { Button, type ButtonProps } from '../button';

export const DialogCancelButton = forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, 'type'>
>(({ children, ...props }, ref) => (
	<Button
		ref={ref}
		variant="outline/primary"
		iconLeft={{
			icon: <X />
		}}
		size="sm"
		{...props}
	>
		{children ?? 'Cancel'}
	</Button>
));
