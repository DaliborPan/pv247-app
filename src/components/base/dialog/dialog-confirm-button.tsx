import { forwardRef } from 'react';

import { Button, type ButtonProps } from '../button';

export const DialogConfirmButton = forwardRef<
	HTMLButtonElement,
	ButtonProps & {
		isError?: boolean;
	}
>(({ children, isError = false, isLoading, ...props }, ref) => (
	<Button
		ref={ref}
		color={isError ? 'error' : 'primary'}
		isLoading={isLoading}
		size="sm"
		iconLeft={{
			name: 'Check'
		}}
		{...props}
	>
		{children ?? 'Potvrdit'}
	</Button>
));
