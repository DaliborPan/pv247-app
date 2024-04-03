import { forwardRef } from 'react';

import { Button, type ButtonProps } from '../button';

export const DialogCancelButton = forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, 'type'>
>(({ children, ...props }, ref) => (
	<Button
		ref={ref}
		variant="primary"
		iconLeft={{
			name: 'X'
		}}
		size="sm"
		{...props}
	>
		{children ?? 'Zrušit'}
	</Button>
));
