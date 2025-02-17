import { cn } from '@/lib/cn';

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mb-4 flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
