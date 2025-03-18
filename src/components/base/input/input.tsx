import * as React from 'react';

import { cn } from '@/lib/cn';

import { Label } from '../label';
import { Icon, type IconProps } from '../icon';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;

  iconLeft?: {
    icon: IconProps['icon'];
    className?: string;
  };
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, iconLeft, ...props }, ref) => (
    <div className="relative flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}

      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-600 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-terciary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          !!iconLeft && 'pr-10',
          className
        )}
        ref={ref}
        {...props}
      />

      {!!iconLeft && (
        <Icon
          icon={iconLeft.icon}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            iconLeft?.className
          )}
        />
      )}
    </div>
  )
);
