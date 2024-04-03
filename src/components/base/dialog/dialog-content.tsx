import { Close, Content, Overlay, Portal } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/cn';

export type DialogSize =
	| 's'
	| 'm'
	| 'l'
	| 'xl'
	| '2xl'
	| '3xl'
	| '4xl'
	| '5xl'
	| '6xl';

const sizeMap: Record<DialogSize, string> = {
	's': 'max-w-sm',
	'm': 'max-w-md',
	'l': 'max-w-lg',
	'xl': 'max-w-xl',
	'2xl': 'max-w-2xl',
	'3xl': 'max-w-3xl',
	'4xl': 'max-w-4xl',
	'5xl': 'max-w-5xl',
	'6xl': 'max-w-6xl'
};

const DialogOverlay = forwardRef<
	React.ElementRef<typeof Overlay>,
	React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
	<Overlay
		ref={ref}
		className={cn(
			'fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className
		)}
		{...props}
	/>
));

export type DialogContentProps = React.ComponentPropsWithoutRef<
	typeof Content
> & {
	size?: DialogSize;
	showClose?: boolean;
};

export const DialogContent = forwardRef<
	React.ElementRef<typeof Content>,
	DialogContentProps
>(({ className, children, showClose = true, size = 'm', ...props }, ref) => (
	<Portal>
		<DialogOverlay />

		<Content
			ref={ref}
			className={cn(
				'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] border bg-white p-6 shadow-lg max-h-[calc(100vh-2rem)] overflow-y-auto duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[3px]',
				sizeMap[size],
				className
			)}
			{...props}
		>
			{children}

			{showClose && (
				<Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
					<X className="size-4" />
					<span className="sr-only">Close</span>
				</Close>
			)}
		</Content>
	</Portal>
));
