import Link, { type LinkProps } from 'next/link';
import { Suspense, type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';
import { type LectureType } from '@/modules/lecture/types';

const SidebarLinkRowDynamic = ({
  href,
  children,
  lecture,
  ...props
}: LinkProps &
  PropsWithChildren<{
    lecture: Pick<LectureType, 'isAvailable'>;
  }>) => (
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

export const SidebarLinkRow = (
  props: LinkProps &
    PropsWithChildren<{
      lecture: Pick<LectureType, 'isAvailable'>;
    }>
) => (
  <Suspense fallback={props.children}>
    <SidebarLinkRowDynamic {...props} />
  </Suspense>
);
