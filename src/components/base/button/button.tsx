import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/cn';

import { Icon, type IconProps } from '../icon';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				'primary': 'bg-primary text-primary-foreground hover:bg-primary/90',
				'primary/inverse':
					'bg-primary-200 text-primary hover:bg-primary-400 hover:text-primary-foreground',
				'destructive':
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				'outline':
					'border border-slate-800 bg-background hover:bg-accent hover:text-accent-foreground',
				'outline/primary':
					'border border-primary bg-transparent text-primary hover:bg-primary-100',
				'outline/destructive':
					'border border-destructive bg-transparent text-destructive hover:bg-destructive/5',
				'secondary': 'bg-slate-800 text-slate-200 hover:bg-slate-800/80',
				'ghost': 'hover:bg-accent hover:text-accent-foreground',
				'link': 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				md: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8 text-base'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	}
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;

		iconLeft?: {
			icon: IconProps['icon'];
			className?: string;
		};

		iconRight?: {
			icon: IconProps['icon'];
			className?: string;
		};

		isLoading?: boolean;
	};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			isLoading = false,
			children,
			iconLeft,
			iconRight,
			...props
		},
		ref
	) => (
		<button
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		>
			{iconLeft && (
				<Icon
					icon={iconLeft.icon}
					className={cn(
						children && 'mr-2',
						iconLeft.className,
						size === 'lg' && 'size-5'
					)}
				/>
			)}

			{children}

			{(!!iconRight || isLoading) && (
				<Icon
					icon={iconRight?.icon ?? <Loader />}
					className={cn(children && 'ml-2', iconRight?.className)}
				/>
			)}
		</button>
	)
);
Button.displayName = 'Button';

export { Button };
