import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/cn';

import { Icon, type IconProps } from '../icon/icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        md: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-7 rounded-md px-2 text-xs',
        lg: 'h-11 rounded-md px-8 text-base'
      },
      variant: {
        'primary': 'bg-primary text-white hover:bg-primary-700',
        'primary/inverse':
          'bg-primary-200 text-primary hover:bg-primary-400 hover:text-white',
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
        'link': 'text-primary underline-offset-4 hover:underline px-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

type SharedButtonProps = VariantProps<typeof buttonVariants> & {
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

// Keep native button props available to action-only wrappers (dialogs, toolbars).
export type ButtonProps = React.ComponentPropsWithRef<'button'> &
  SharedButtonProps & { href?: never };

type ButtonLinkProps = React.ComponentPropsWithRef<typeof Link> &
  SharedButtonProps & { disabled?: boolean };

const Button = ({
  className,
  variant,
  size,
  isLoading = false,
  disabled,
  children,
  iconLeft,
  iconRight,
  asChild: _asChild,
  ...props
}: ButtonProps | ButtonLinkProps) => {
  const isDisabled = !!disabled || isLoading;
  const classes = cn(buttonVariants({ variant, size, className }));
  const content = (
    <>
      {(!!iconLeft || !!isLoading) && (
        <Icon
          icon={isLoading ? <Loader /> : iconLeft?.icon}
          className={cn(
            children && 'mr-2',
            isLoading && 'animate-spin',
            iconLeft?.className,
            size === 'lg' && 'size-5'
          )}
        />
      )}

      {children}

      {!!iconRight && !isLoading && (
        <Icon
          icon={iconRight.icon}
          className={cn(children && 'ml-2', iconRight?.className)}
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { ref, ...linkProps } = props;

    if (isDisabled) {
      // An anchor without href cannot navigate, even from the keyboard or context menu.
      return (
        // oxlint-disable-next-line jsx-a11y/anchor-is-valid -- Disabled links deliberately have no destination.
        <a
          ref={ref}
          aria-disabled="true"
          aria-label={linkProps['aria-label']}
          title={linkProps.title}
          tabIndex={-1}
          className={cn(classes, 'pointer-events-none opacity-50')}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...linkProps} ref={ref} className={classes}>
        {content}
      </Link>
    );
  }

  const { ref, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      disabled={isDisabled}
      className={classes}
    >
      {content}
    </button>
  );
};
Button.displayName = 'Button';

export { Button };
