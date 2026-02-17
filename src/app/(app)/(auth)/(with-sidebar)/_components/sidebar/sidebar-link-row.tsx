'use client';

import Link, { type LinkProps } from 'next/link';
import { Suspense, type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';
import { LectureType } from '@/modules/lecture/schema';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';

const SidebarLinkRowDynamic = ({
  href,
  children,
  lecture,
  ...props
}: LinkProps &
  PropsWithChildren<{
    lecture: LectureType;
  }>) => {
  const isAvailable = checkIsAvailable(lecture);

  return (
    <Link
      {...props}
      href={href}
      className={cn(
        'flex items-center text-text-secondary hover:underline',
        !isAvailable && 'pointer-events-none opacity-50'
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
