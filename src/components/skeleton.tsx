import { cn } from '@/lib/cn';

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn('w-full animate-pulse rounded-md bg-primary-200', className)}
  >
    <span className="invisible">.</span>
  </div>
);
