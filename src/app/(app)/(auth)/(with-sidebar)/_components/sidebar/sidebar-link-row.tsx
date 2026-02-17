import Link, { type LinkProps } from 'next/link';
import { Suspense, type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';
import { LectureType } from '@/modules/lecture/schema';

const SidebarLinkRowDynamic = ({
  href,
  children,
  lecture,
  ...props
}: LinkProps &
  PropsWithChildren<{
    lecture: LectureType;
  }>) => {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        'flex items-center text-text-secondary hover:underline',
        !lecture.isAvailable && 'pointer-events-none opacity-50'
      )}
    >
      {children}
    </Link>
  );
};

export const SidebarLinkRow = (
  props: LinkProps &
    PropsWithChildren<{
      lecture: LectureType;
    }>
) => {
  return (
    <Suspense fallback={props.children}>
      <SidebarLinkRowDynamic {...props} />
    </Suspense>
  );
};
