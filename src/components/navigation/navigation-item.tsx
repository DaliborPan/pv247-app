'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren } from 'react';

type NavigationItemProps = PropsWithChildren<{
  href: string;
}>;

export const NavigationItem = ({ children, href }: NavigationItemProps) => {
  const pathname = usePathname();

  const isActive = href.includes('lector')
    ? pathname.startsWith(href)
    : pathname === href;

  return (
    <li className="relative whitespace-nowrap mt-[2px]">
      <Link href={href}>{children}</Link>

      {isActive && (
        <span className="absolute -bottom-5 left-0 -mx-4 h-1 w-[calc(100%_+_2rem)] rounded-full bg-primary" />
      )}
    </li>
  );
};
