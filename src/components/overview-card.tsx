import { type ComponentProps } from 'react';

import { cn } from '@/lib/cn';

const Root = ({ className, ...props }: ComponentProps<'article'>) => (
  <article
    className={cn('flex flex-col rounded-lg bg-card p-6 shadow', className)}
    {...props}
  />
);

const Meta = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'mb-1 flex items-center text-xs text-text-terciary',
      className
    )}
    {...props}
  />
);

const Title = ({
  as: Heading = 'h2',
  className,
  ...props
}: ComponentProps<'h2'> & { as?: 'h2' | 'h3' | 'h4' }) => (
  <Heading className={cn('text-xl font-medium', className)} {...props} />
);

const Description = ({ className, ...props }: ComponentProps<'p'>) => (
  <p
    className={cn(
      'mt-3 line-clamp-5 grow text-sm leading-6 text-text-secondary',
      className
    )}
    {...props}
  />
);

const Footer = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'mt-auto flex flex-col gap-4 pt-6 lg:flex-row lg:items-end',
      className
    )}
    {...props}
  />
);

export const OverviewCard = Object.assign(Root, {
  Meta,
  Title,
  Description,
  Footer
});
